import { DownloadIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PhantomDownloader() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-8">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <h1 className="text-white text-3xl font-medium">PhantomBuster Downloader</h1>

        <div className="w-full space-y-6">
          <Input
            type="text"
            placeholder="API Key"
            className="bg-[#333333] border-[#444444] text-gray-200 placeholder:text-gray-500 h-12"
          />

          <Input
            type="text"
            placeholder="Phantom ID"
            className="bg-[#333333] border-[#444444] text-gray-200 placeholder:text-gray-500 h-12"
          />
        </div>

        <Button className="w-full bg-[#3b5fe2] hover:bg-[#3252c7] text-white h-12 text-lg">
          <DownloadIcon className="mr-2 h-5 w-5" />
          Baixar Dados
        </Button>
      </div>
    </div>
  )
}
