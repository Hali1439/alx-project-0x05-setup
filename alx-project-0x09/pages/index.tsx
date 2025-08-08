import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    console.log("Generating Image");
    console.log(process.env.NEXT_PUBLIC_GPT_API_KEY);
    
    // For now just simulate image generation
    setIsLoading(true);
    try {
      const testImageUrl = `https://via.placeholder.com/512x512/3b82f6/ffffff?text=${encodeURIComponent(prompt)}`;
      await new Promise(resolve => setTimeout(resolve, 1000));
      setImageUrl(testImageUrl);
      setGeneratedImages(prev => [...prev, { imageUrl: testImageUrl, prompt }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg transition duration-200 ${
              isLoading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {imageUrl && (
          <ImageCard 
            action={() => setImageUrl(imageUrl)} 
            imageUrl={imageUrl} 
            prompt={prompt} 
          />
        )}

        {generatedImages.length > 0 && (
          <div className="mt-8 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4">Generated Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {generatedImages.map((image, index) => (
                <ImageCard
                  key={index}
                  action={() => setImageUrl(image.imageUrl)}
                  imageUrl={image.imageUrl}
                  prompt={image.prompt}
                  width="w-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;