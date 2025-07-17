// File: frontend/components/LeakMatchesTable.jsx

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LeakMatchesTable() {
  const [matches, setMatches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, docs: 0, texts: 0 });

  const fetchData = () => {
    fetch("http://localhost:5000/api/matches")
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setFiltered(data);
        setStats({
          total: data.length,
          docs: data.filter(m => m.type === "document").length,
          texts: data.filter(m => m.type === "text").length
        });
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFiltered(
      matches.filter(m =>
        m.channel.toLowerCase().includes(search.toLowerCase()) ||
        m.type.toLowerCase().includes(search.toLowerCase()) ||
        m.details.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, matches]);

  const exportCSV = () => {
    const header = "Channel,Date,Type,Details\n";
    const rows = filtered.map(m => `${m.channel},${m.date},${m.type},${m.details}`).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "leak_matches.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="m-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Telegram Leak Matches</h2>

        {/* Dashboard Cards */}
        <div className="flex gap-4 mb-4">
          <Card className="p-2 text-center">
            <p className="text-sm">Total</p>
            <p className="text-lg font-bold">{stats.total}</p>
          </Card>
          <Card className="p-2 text-center">
            <p className="text-sm">Documents</p>
            <p className="text-lg font-bold">{stats.docs}</p>
          </Card>
          <Card className="p-2 text-center">
            <p className="text-sm">Text Matches</p>
            <p className="text-lg font-bold">{stats.texts}</p>
          </Card>
        </div>

        {/* Search + Export */}
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search by channel, type, or details..."
            className="w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={exportCSV}>Export CSV</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Channel</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((match, idx) => (
              <TableRow key={idx} className={match.matched ? "bg-red-100" : ""}>
                <TableCell>{match.channel}</TableCell>
                <TableCell>{match.date}</TableCell>
                <TableCell>{match.type}</TableCell>
                <TableCell>{match.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
