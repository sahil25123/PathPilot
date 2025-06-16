import React, { useState } from 'react'
import axios from "axios";

const Analyzer = () => {

    const [jobDesc , setJobdesc] = useState("");
    const [uploadResume , setUploadedResume] = useState(null);
    const [result , setResult] = useState("");

    const handleAnalyzer =  async () =>{
        if (!uploadResume || !jobDesc) return alert("please upload the reusume");

         const formData = new FormData();
    formData.append("resume", uploadResume);
    formData.append("jobDesc", jobDesc);

  
    try {
      const res = await axios.post("http://localhost:9000/api/v1/analyze", formData);
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    }
    }
  return (
    <div>
        <div> Resume Anayzer </div>

        <div>
        <label> upload Resume file </label>
        <input type="file" onChange={(e) => setUploadedResume(e.target.files[0])} accept='.pdf' ></input>
        </div>


        <div className='jobDesc'>
            <label>Job Desc </label>
            <input type='text' placeholder='Enter Job Description' onChange={(e) => setJobdesc(e.target.value)} value= {jobDesc}></input>

        </div>

        <div className='handleRsume'>
            <button onClick={handleAnalyzer}>
                Analyze Resume
            </button>
        </div>



        <div>
            Ai Feedback : 
            <p>{result}</p>
        </div>
      
    </div>
  )
}

export default Analyzer
