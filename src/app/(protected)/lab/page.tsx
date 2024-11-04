'use client'

import { useState } from 'react'
import { Music, Upload, Link, Play, Pause, RefreshCw, Download, Clock, Volume2 } from 'lucide-react'
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Slider } from "@components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Switch } from "@components/ui/switch"

export default function VideoMusicGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulating generation process
    setTimeout(() => {
      setIsGenerating(false)
      setProgress(100)
    }, 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Generate Music for Your Video</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Video Input</CardTitle>
          <CardDescription>Upload your video or provide a link</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Video</TabsTrigger>
              <TabsTrigger value="link">Video Link</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <Label htmlFor="video-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">MP4, AVI, MOV (MAX. 800MB)</p>
                  </div>
                  <Input id="video-upload" type="file" className="hidden" accept="video/*" />
                </Label>
              </div>
            </TabsContent>
            <TabsContent value="link" className="space-y-4">
              <div className="flex space-x-2">
                <Input type="url" placeholder="Paste video URL here" />
                <Button>Load</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Music Generation Settings</CardTitle>
          <CardDescription>Customize the music for your video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select>
              <SelectTrigger id="genre">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cinematic">Cinematic</SelectItem>
                <SelectItem value="electronic">Electronic</SelectItem>
                <SelectItem value="acoustic">Acoustic</SelectItem>
                <SelectItem value="ambient">Ambient</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Mood</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Calm</span>
              <span>Neutral</span>
              <span>Energetic</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Tempo (BPM)</Label>
            <Slider defaultValue={[120]} min={60} max={200} step={1} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>60</span>
              <span>120</span>
              <span>200</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="sync-video" />
            <Label htmlFor="sync-video">Sync music to video tempo</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Generate Music
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Listen to your generated music with the video</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            <span className="text-muted-foreground">Video Preview</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>00:00 / 03:30</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Regenerate</Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}