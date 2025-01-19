import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Box } from '@mui/material'
import { useRef } from 'react'
import Paper from '@mui/material/Paper'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ClearIcon from '@mui/icons-material/Clear'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsDemo } from '@/components/tabsdemo'
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import MicOffIcon from '@mui/icons-material/MicOff'
import io from 'socket.io-client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const Feature = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [recording, setRecording] = useState(false)
  const audioChunksRef = useRef<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  // sockets
  const [completeTranscription, setCompleteTranscription] = useState('')
  const [message, setMessage] = useState<string>('')
  const [socket, setSocket] = useState(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://127.0.0.1:5001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
    })

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Socket.IO connection established!')
      newSocket.emit('hello', 'Hello, server!')
    })

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error)
    })

    // Listen for transcription events
    newSocket.on('transcription_complete', (data) => {
      console.log('Received transcription:', data.text)
      setMessage(data.text)
      setCompleteTranscription(data.text)
      // toast('Transcription complete!')
    })

    newSocket.on('summary_complete', (data) => {
      console.log('Received summary:', data.text)
      setMessage(data.text)
      setCompleteTranscription(data.text)
      // toast('Summary complete!')
    })

    setSocket(newSocket)

    // Cleanup on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [])

  const goToQuiz = () => {
    navigate('/learning')
  }

  const startRecording = async () => {
    audioChunksRef.current = []
    toast('Recording started', {
      action: { label: 'Cancel', onClick: stopRecording },
    })
    // Get user media (microphone access)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    streamRef.current = stream

    // Create a MediaRecorder instance to record audio
    const mediaRecorder = new MediaRecorder(stream)

    // Push the audio chunks to the audioChunksRef
    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data)
    }

    // When recording stops, create the audio blob and set the URL
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
      const audioFile = new File([audioBlob], 'recording.wav', {
        type: 'audio/wav',
      })
      setFile(audioFile) // Set the file state
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioURL(audioUrl) // Create a preview URL
      // audioChunksRef.current = [] // Clear the audio chunks
    }

    // Start recording
    mediaRecorder.start()
    mediaRecorderRef.current = mediaRecorder
    setRecording(true)
  }

  const stopAudioStream = (stream: MediaStream) => {
    const tracks = stream.getTracks()
    tracks.forEach((track) => track.stop())
  }

  const clearFile = () => {
    console.log('here')
    setFile(null)
    setData('')
    if (fileInputRef.current) {
      fileInputRef.current.value = '' // Clear the file input
    }
    toast('File cleared')
  }

  // Stop recording audio
  const stopRecording = async () => {
    console.log('stop recording')
    if (streamRef.current) {
      stopAudioStream(streamRef.current)
    }

    if (mediaRecorderRef.current) {
      return new Promise((resolve) => {
        mediaRecorderRef.current!.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/wav',
          })
          const audioFile = new File([audioBlob], 'recording.wav', {
            type: 'audio/wav',
          })
          setFile(audioFile)
          const audioUrl = URL.createObjectURL(audioBlob)
          setAudioURL(audioUrl)

          setRecording(false)
          setLoading(true)

          try {
            toast('Recording stopped ... sending to Auracle')
            await callfetch(audioFile)
          } catch (error) {
            setError('There was a problem with the recording. Please try again')
            toast('There was a problem with the recording. Please try again')
          } finally {
            setLoading(false)
            resolve()
          }
        }

        mediaRecorderRef.current!.stop()
      })
    } else {
      setError('There was a problem with the recording.')
      toast('There was a problem with the recording. Please try again')
    }
  }

  const convertFileToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file) // Read the file as an ArrayBuffer
      reader.onload = () => {
        const arrayBuffer = reader.result
        const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer)
        let binary = ''
        uint8Array.forEach((byte) => {
          binary += String.fromCharCode(byte)
        })
        resolve(btoa(binary)) // Convert binary string to Base64
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const callfetch = async (file: File) => {
    const formData = new FormData()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      const base64String = await convertFileToBase64(file)
      formData.append('fileName', file.name)
      formData.append('fileType', file.type)
      if (typeof base64String === 'string') {
        formData.append('file', base64String) // Append Base64 string to FormData
      }
      const fileBytes = await file.arrayBuffer()

      const byteArray = new Uint8Array(fileBytes)

      // Optionally, print only the first 100 bytes to avoid large console logs
      console.log('First 100 bytes:', byteArray.slice(0, 100))

      // Append the array buffer as a byte array (Uint8Array)
      // formData.append('file', base64, file.name);

      // Log the size of the byte array
      console.log('Byte array size:', fileBytes.byteLength)
      const response = await axios.post(
        'http://127.0.0.1:5001/auricle',
        formData,
        config,
      )
      setData(response.data ?? '')
      console.log('File uploaded successfully', response.data)
      toast('Transcription and summary complete!')
    } catch (error) {
      console.log('jajaj')
      console.error('Error uploading file:', error)
      setError('Error uploading file')
      toast('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    if (file) {
      setLoading(true)
      toast('File submitted to Auracle')
      await callfetch(file)
    } else {
      setError('Please select a file before submitting.')
      toast('Please select a file before submitting.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  return (
    <Paper
      sx={{
        backgroundColor: '#f5faff', // Change to your desired color
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        width: '100vw',
      }}
      elevation={0}
    >
      <span>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full viewport height
            textAlign: 'center', // Center-align text
            gap: '1rem',
          }}
        >
          <h1 style={{ color: '#003f6a', marginTop: '4rem' }}>
            Lecture Transcriber
          </h1>
          <p style={{ color: '#6f93ae'}}>
            Record or upload your lecture audio for real-time transcription and
            summarization
          </p>
          <Paper
            elevation={0}
            sx={{
              padding: '1rem',
              marginBottom: '0.5rem',
              marginTop: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="audio">Upload lecture recording here</Label>
              <span className="flex flex-row gap-2">
                <Input
                  id="audio"
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <Button size="icon" onClick={clearFile}>
                  <ClearIcon />
                </Button>
              </span>
            </span>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                borderRadius: '24px',
                margin: '1rem',
                width: '100%',
                position: 'relative',
                left: '1rem',
              }}
            >
              <Button
                size="lg"
                onClick={recording ? stopRecording : startRecording}
                variant={recording ? 'destructive' : 'outline'}
              >
                {recording ? <MicOffIcon /> : <SettingsVoiceIcon />}
                {recording ? 'Stop Recording' : 'Start Recording'}
              </Button>
              <Button size="lg" onClick={handleClick} disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <FileUploadIcon />
                )}
                {loading ? 'Loading...' : 'Send File to Auracle'}
              </Button>
            </Box>
          </Paper>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={goToQuiz} size="icon" variant="outline" style={{position: 'absolute', top: '28rem', right: '22rem'}}>
                  <EditNoteIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create quiz</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Paper elevation={0} sx={{ padding: '1rem', width: '63%' }}>
            <TabsDemo data={data ?? ''} />
          </Paper>
        </Box>
      </span>
    </Paper>
  )
}

export default Feature
