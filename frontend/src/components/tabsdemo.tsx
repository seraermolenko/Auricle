// import { Button } from '@/components/ui/button'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { ScrollArea } from '@/components/ui/scroll-area'

// interface DataProps {
//   data: {
//     data: {
//       summary: string
//       transcription: string
//     }
//     message: string
//     status: string
//   }
// }

// export function TabsDemo(data: DataProps) {
//   console.log(JSON.stringify(data))
//   return (
//     <Tabs defaultValue="summary" className="w-[900px]">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="transcript">Transcript</TabsTrigger>
//         <TabsTrigger value="summary">Summary</TabsTrigger>
//       </TabsList>
//       <TabsContent value="summary">
//         <Card className="flex flex-col w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Summary</CardTitle>
//             <CardDescription>Scroll through the summary below.</CardDescription>
//           </CardHeader>
//           <CardContent className="flex-grow overflow-hidden">
//             <ScrollArea className="h-full">
//               {data.data && data.data.data?.summary
//                 ? data.data.data?.summary
//                 : 'No summary available yet... Start recording or upload a file to get started.'}
//             </ScrollArea>
//           </CardContent>
//         </Card>
//       </TabsContent>
//       <TabsContent value="transcript">
//         <Card className="flex flex-col w-full h-[400px]">
//           <CardHeader>
//             <CardTitle>Transcript</CardTitle>
//             <CardDescription>
//               Scroll through the transcript below.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex-grow overflow-hidden">
//             <ScrollArea className="h-full">
//               {data.data && data.data.data?.transcription
//                 ? data.data.data?.transcription
//                 : 'No transcription available yet... Start recording or upload a file to get started.'}
//             </ScrollArea>
//           </CardContent>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   )
// }

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown'

interface DataProps {
  data: {
    data: {
      summary: string;
      transcription: string;
    }
    message: string;
    status: string;
  }
}

export function TabsDemo(data: DataProps) {
  const [displayedSummary, setDisplayedSummary] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    if (data.data?.data?.summary) {
      // Split the summary into sentences
      const sentences = data.data.data.summary.match(/[^.!?]+[.!?]+/g) || [];

      // Reset if there's new data
      if (displayedSummary === '') {
        setCurrentSentenceIndex(0);
      }

      // Add next sentence every 1.5 seconds
      const timer = setInterval(() => {
        if (currentSentenceIndex < sentences.length) {
          setDisplayedSummary(prev =>
            prev + (prev ? ' ' : '') + sentences[currentSentenceIndex].trim()
          );
          setCurrentSentenceIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
        }
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [data.data?.data?.summary, currentSentenceIndex]);

  return (
    <Tabs defaultValue="summary" className="w-[900px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      <TabsContent value="summary">
        <Card className="flex flex-col w-full h-[400px]">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>Scroll through the summary below.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              {data.data && data.data.data?.summary
                ? <ReactMarkdown>{displayedSummary}</ReactMarkdown>
                : 'No summary available yet... Start recording or upload a file to get started.'}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="transcript">
        <Card className="flex flex-col w-full h-[400px]">
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>
              Scroll through the transcript below.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              {data.data && data.data.data?.transcription
                ? <ReactMarkdown className='markdown-content'>{data.data.data?.transcription}</ReactMarkdown>
                : 'No transcription available yet... Start recording or upload a file to get started.'}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default TabsDemo;
