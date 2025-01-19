import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

export function TabsDemo({ data }: { data: string }) {
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
              {data.summarized
                ? data.summarized
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
              {data.transcribed
                ? data.transcribed
                : 'No transcription available yet... Start recording or upload a file to get started.'}
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
