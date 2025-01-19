import os
from pydub import AudioSegment
import speech_recognition as sr
from flask import Blueprint, jsonify, request

from huggingface_hub import hf_hub_download
from llama_cpp import Llama

# Create a blueprint for product-related routes
auricleService = Blueprint('auricleService', __name__)

# Download and setup remains the same
model_name = "SanctumAI/gemma-2-9b-it-GGUF"

model_file = "gemma-2-9b-it.Q4_K_M.gguf"
model_path = hf_hub_download(model_name, filename=model_file)

# Initialize the model
llm = Llama(
    model_path=model_path,
    n_ctx=20000,
)

@auricleService.route('/', methods=['POST'])
def transcribeAndSummarize():
    try:
        filename = request.form.get("filename")
        file = request.form.get("file")
        transcription = transcribe_audio(file)
        stream = summarize(transcription)

        return jsonify({"status": "200", "message": "Successfully auricled your data!", "data": "data"})
    except Exception as e:
        return jsonify({"status": "400", "message": e})
        

def summarize(transcript):
    # For streaming, use create_completion() with stream=True
    prompt = f"Summerize the following text. Only output the summary: {transcript}"

    # Method 1: Using create_completion()
    stream = llm.create_completion(
        prompt,
        max_tokens=10000,
        stop=["</s>"],
        echo=True,
        stream=True  # This enables streaming
    )
    return stream

    # # Print the stream
    # for output in stream:
    #     chunk = output["choices"][0]["text"]
    #     print(chunk, end="", flush=True)  # Print each chunk as it arrives

def convert_to_wav(input_file_path, output_dir=None):
    # Check if input file exists
    if not os.path.exists(input_file_path):
        raise FileNotFoundError(f"Input file not found: {input_file_path}")

    # Get file extension
    _, file_extension = os.path.splitext(input_file_path)
    file_extension = file_extension.lower()

    # Set output directory
    if output_dir is None:
        output_dir = os.path.dirname(input_file_path)

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Generate output filename
    base_name = os.path.basename(input_file_path)
    output_filename = os.path.splitext(base_name)[0] + '.wav'
    output_path = os.path.join(output_dir, output_filename)

    try:
        # # Handle video files
        # if file_extension in ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.m4v']:
        #     video = VideoFileClip(input_file_path)
        #     audio = video.audio
        #     audio.write_audiofile(output_path)
        #     audio.close()
        #     video.close()

        # Handle audio files
        if file_extension in ['.mp3', '.m4a', '.wav', '.ogg', '.flac', '.aac']:
            audio = AudioSegment.from_file(input_file_path)
            audio.export(output_path, format='wav')

        else:
            raise ValueError(f"Unsupported file format: {file_extension}")

        return output_path

    except Exception as e:
        raise Exception(f"Error converting file: {str(e)}")


def transcribe_audio(file_path):
    wav_file_path = convert_to_wav(file_path)
    r = sr.Recognizer()
    with sr.AudioFile(wav_file_path) as source:
        audio = r.record(source)
        transcription = r.recognize_google(audio)
    return transcription



    

