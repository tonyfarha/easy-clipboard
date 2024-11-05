import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG as QRCode } from 'qrcode.react';

export const Home = () => {
  return (
    <>
      <Textarea
        placeholder="Enter your text here..."
        className="min-h-[100px]"
        aria-label="Text input"
      />
      <QRCode value={`${document.location}`} />
    </>
  )
}
