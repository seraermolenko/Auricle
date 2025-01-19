import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import { toast } from 'sonner'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const FormSchema = z.object({
  type: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),
})

const Feature = () => {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  useEffect(() => {
    callfetch()
  }, [])

  const callfetch = async () => {
    setLoading(true)
    const config = {
      maxRedirects: 0,
    }

    try {
      console.log('Fetching data...')
      const response = await axios.get('http://127.0.0.1:5001/auricle', config)
      setData(response.data ?? '')
      console.log('Data:', response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-16">
            Interactive Learning Quiz
          </h1>
          <p className="text-lg text-blue-600">
            Test your knowledge from the lecture notes
          </p>
        </div>

        <div className="max-w-3xl mx-auto -mt-32">
          <Carousel className="w-full">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <Card className="border-2 border-blue-100">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-sm font-medium text-blue-600">
                            Question {index + 1} of 5
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            Points: 10
                          </span>
                        </div>

                        <div className="text-lg font-medium text-gray-900 mb-6">
                          What is the main concept discussed in the lecture?
                        </div>

                        <RadioGroup defaultValue="option-1" className="space-y-4">
                          {['Option A', 'Option B', 'Option C', 'Option D'].map((option, i) => (
                            <div
                              key={option}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <RadioGroupItem 
                                value={`option-${i + 1}`} 
                                id={`option-${i + 1}`}
                              />
                              <Label
                                htmlFor={`option-${i + 1}`}
                                className="text-base font-medium text-gray-700 cursor-pointer flex-grow"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>

                        <div className="flex justify-between items-center mt-8">
                          <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => setCurrentQuestion(Math.min(4, currentQuestion + 1))}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute -left-12 top-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2" />
            </div>
          </Carousel>

          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentQuestion ? 'bg-blue-600' : 'bg-blue-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        </Box>
      </span>
    </Paper>
    // </div>


  )
}

export default Feature
