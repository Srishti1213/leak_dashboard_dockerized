// File: frontend/src/App.jsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldAlert, Bug, Globe2, FileText, Network } from "lucide-react";

function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Android Threat Attribution Dashboard</h1>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview"><ShieldAlert className="inline mr-2" /> Overview</TabsTrigger>
            <TabsTrigger value="device"><Bug className="inline mr-2" /> Device Forensics</TabsTrigger>
            <TabsTrigger value="network"><Network className="inline mr-2" /> Network</TabsTrigger>
            <TabsTrigger value="osint"><Globe2 className="inline mr-2" /> OSINT</TabsTrigger>
            <TabsTrigger value="report"><FileText className="inline mr-2" /> Report</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h2 className="text-xl font-semibold">Attribution Summary</h2>
                <p>Device ID: <code>A101</code></p>
                <p>Attribution Confidence: <span className="font-bold text-green-600">90%</span></p>
                <p>Timeframe of Exfiltration: 11:30 AM - 12:10 PM, July 13, 2025</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="device">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">Hidden Apps Detected</h2>
                <ul className="list-disc ml-6 text-red-600">
                  <li>com.spy.hideicon</li>
                  <li>net.cloak.stealthcam</li>
                </ul>
                <h2 className="text-lg font-semibold mt-6 mb-2">Dangerous Permissions</h2>
                <ul className="list-disc ml-6">
                  <li>Microphone access: 3 apps</li>
                  <li>Camera access: 5 apps</li>
                  <li>Storage access: 8 apps</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <Card>
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">Suspicious DNS Queries</h2>
                <ul className="list-disc ml-6">
                  <li>exfil-data.ddns.net</li>
                  <li>stealthproxy.org</li>
                </ul>
                <h2 className="text-lg font-semibold mt-4">Open Ports Detected</h2>
                <p>22, 80, 443 on remote host 193.148.52.11</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="osint">
            <Card>
              <CardContent className="p-4 space-y-3">
                <h2 className="text-lg font-semibold">Telegram Leak Matches</h2>
                <ul className="list-disc ml-6">
                  <li><a href="#" className="text-blue-600 underline">t.me/leak_insider/42</a></li>
                  <li><a href="#" className="text-blue-600 underline">t.me/gov_files/19</a></li>
                </ul>
                <h2 className="text-lg font-semibold">Dark Web Matches</h2>
                <p>Matched file hash on Onion domain: <code>leakzsk47.onion</code></p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardContent className="p-4 text-center">
                <Button className="mt-4">Download Full PDF Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default App;
