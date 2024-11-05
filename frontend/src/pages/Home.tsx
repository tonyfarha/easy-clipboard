import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { socket } from '@/socket';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';

export const Home = () => {

  const [clipboard, setClipboard] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    socket.connect();
    socket.emit('join-clipboard', id);

    socket.on('update-clipboard', (clipboardText: string) => {
      setClipboard(clipboardText);
    });

    return () => {
      socket.off('join-clipboard');
      socket.off('update-clipboard');
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
    </>
  )
}
