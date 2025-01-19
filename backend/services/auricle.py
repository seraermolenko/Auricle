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
        transcription = "ENTER TRANSCRIBE FUNCTION HERE"
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



    

