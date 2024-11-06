import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { socket } from '@/socket';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';
import { Skeleton } from "@/components/ui/skeleton"

export const Home = () => {

  const [clipboard, setClipboard] = useState<string>('');
  const [connectedClients, setConnectedClients] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    socket.connect();
    socket.emit('join-clipboard', id);

    socket.on('update-clipboard', (clipboardText: string) => {
      setClipboard(clipboardText);
    });

    socket.on('connected-clients', (clients: number) => {
      setConnectedClients(clients);
    });

    return () => {
      socket.off('join-clipboard');
      socket.off('update-clipboard');
      socket.off('connected-clients');
      socket.disconnect();
    }
  }, []);

  const handleUpdateClipboard = useDebouncedCallback((clipboardText: string) => {
    socket.emit('update-clipboard', { clipboardText, clipboardID: id });
  }, 500);

  return (
    <>
      <Textarea
        placeholder="Enter your text here..."
        className="min-h-[100px]"
        aria-label="Text input"
        value={clipboard}
        onChange={(e) => {
          setClipboard(e.target.value);
          handleUpdateClipboard(e.target.value);
        }}
      />
      <QRCode value={`${document.location}`} />
      {connectedClients > 0 ? <p className="text-center text-green-600 text-sm">{connectedClients} connected {`${connectedClients === 1 ? 'client' : 'clients'}`}</p> : <Skeleton className="w-[150px] h-[10px] rounded-full" />}
    </>
  )
}
