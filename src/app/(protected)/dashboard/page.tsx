'use client'

import { useState } from 'react'
import { Music, Play, Pause, SkipForward, Loader2, Plus, Download, Share2 } from 'lucide-react'
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Progress } from "@components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Slider } from "@components/ui/slider"

export default function ClientMusicGenerationDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(33)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-2">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">MusicGen</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Upgrade Plan</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <img
                  className="rounded-full"
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">4 active, 8 completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Music Generated</CardTitle>
              <Loader2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37 mins</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plan Usage</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65%</div>
              <Progress value={65} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">35% remaining this month</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Project</TabsTrigger>
            <TabsTrigger value="recent">Recent Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Epic Adventure Score</CardTitle>
                <CardDescription>Started 2 hours ago • 33% complete</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Audio Waveform Visualization</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Progress value={progress} className="flex-1" />
                  <span className="text-sm text-muted-foreground">0:49 / 2:34</span>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Adjustments</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Tempo</span>
                    <Slider defaultValue={[120]} max={200} step={1} className="flex-1" />
                    <span className="text-sm text-muted-foreground">120 BPM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Mood</span>
                    <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                    <span className="text-sm text-muted-foreground">Neutral</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button>Generate More</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>Your last 3 music generation projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Relaxing Ambient", duration: "5:12", status: "Completed" },
                  { name: "Upbeat Pop Tune", duration: "3:45", status: "Completed" },
                  { name: "Mysterious Soundtrack", duration: "4:20", status: "In Progress" },
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">Duration: {project.duration}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{project.status}</span>
                      {project.status === "Completed" && (
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Projects</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
            <Button variant="outline" className="w-full">
              <SkipForward className="mr-2 h-4 w-4" /> Continue Last Project
            </Button>
            <Button variant="secondary" className="w-full">
              <Loader2 className="mr-2 h-4 w-4" /> Generate Random Music
            </Button>
            <Button variant="outline" className="w-full">
              <Music className="mr-2 h-4 w-4" /> Browse Templates
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}