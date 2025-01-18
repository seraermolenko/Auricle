import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Feature = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState<File | null>(null);

  const goToFeature = () => {
    navigate("/");
  };

  const callfetch = async (file: File) => {
    const formData = new FormData();
    formData.append('wavfile', file, file.name);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/asr/', formData, config);
      console.log('File uploaded successfully', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    if (file) {
      setLoading(true);
      await callfetch(file);
    } else {
      setError('Please select a file before submitting.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <Button onClick={goToFeature}>Go Home</Button>
      <Button onClick={handleClick} disabled={loading}>Upload File</Button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="audio">Upload lecture recording here</Label>
        <Input 
          id="audio" 
          type="file" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Feature;