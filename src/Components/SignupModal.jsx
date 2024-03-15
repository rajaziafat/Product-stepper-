import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';



const Modal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3; // Adjusted to match the total number of steps

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne nextStep={nextStep} />;
      case 2:
        return <StepTwo nextStep={nextStep} />;
      case 3:
        return <StepThree nextStep={nextStep} />;
      default:
        return null;
    }
  };

  const getStepName = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return "Your New Product";
      case 2:
        return "Your New Product";
      case 3:
        return "Your New Product";

      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent bg-opacity-80 px-4">
      <div className="bg-[#2d2d2d] border-gray-600 w-full max-w-[900px] h-[800px] md:h-[700px] p-4 rounded-xl shadow-lg flex flex-col overflow-x-auto">
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 cursor-pointer"
            onClick={onClose}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex justify-center text-white">
          <h2 className="text-2xl mb-4">
            {getStepName(step)} (step {step}/{totalSteps})
          </h2>
        </div>
        {renderStep()}
        <div className="flex justify-center mt-auto">
          {step !== 1 && (
            <button
              onClick={prevStep}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded inline-flex items-center mr-2"
            >
              Back
            </button>
          )}
          {step !== totalSteps ? (
            <button
              onClick={nextStep}
              className="bg-[#21c55e] hover:bg-[#388153] hover:duration-300 text-white font-bold py-2 px-6 rounded inline-flex items-center"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#21c55e] hover:bg-[#388153] text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>


  );
};

const products = [
  { value: 'digital', label: 'Digital product' },
  { value: 'physical', label: 'Physical product' },
  { value: 'service', label: 'Service' },
];









const StepOne = ({ nextStep }) => {

  const [labelText, setLabelText] = useState('Price ');

  const price = [
    { value: 'fixed', label: 'Fixed' },
    { value: 'auction', label: 'Auction' },
  ];

  const handlePriceChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption && selectedOption.value === 'auction') {
      setLabelText('Starting price');
    } else {
      setLabelText('Fixed Price');
    }
  };








  const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: '2px solid #555',
      borderColor: state.isFocused ? '#555' : '#555',
      borderRadius: '5px',
      padding: '2px',
      boxShadow: state.isFocused ? '0 0 0 1px #555' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#21c55e' : '#333',
      '&:hover': {
        backgroundColor: 'RGBA(33,171,83,0.5)', // Light purple with opacity
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#fff', // Adjust text color to white
    }),
    input: (provided, state) => ({
      ...provided,
      color: '#fff',
      '&::placeholder': {
        color: '#fff !important', // Adjust placeholder color here
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff', // Adjust dropdown menu background color
      zIndex: 9999, // Set the z-index value as needed
    }),
  };


  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    // Trigger click event on file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Simulate upload process (you would replace this with your actual upload logic)
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      // Simulate upload progress
      simulateUploadProgress(file);
    };
    reader.readAsDataURL(file);
  };

  const simulateUploadProgress = (file) => {
    const totalSize = file.size;
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10000; // Simulate progress by adding 10KB each interval
      const progress = Math.min((loaded / totalSize) * 100, 100);
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 100); // Simulate progress every 100 milliseconds
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setUploadProgress(0);
  };

  return (
    <>
      <div className='grid grid-cols-12 gap-4 mt-5 items-center '>
        <div className='col-span-12 md:col-span-6 w-full'>









          <div className='py-2 px-2 relative mt-2 '>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Product Name</label>

            <input
              type="text"
              className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
              required
              placeholder='Product Name'
            />

          </div>

          <div className='relative py-2 px-2'>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Price</label>
            <Select
              onChange={handlePriceChange}
              defaultValue={selectedOption}
              options={price}
              styles={customStyles}
              placeholder='Select price'
              className=''
            />
          </div>

          <div className='py-2 px-2 relative mt-2 '>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">{labelText}</label>

            <input
              type="text"
              className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none"
              required
              placeholder='00.0'
            />
          </div>






          <div className='relative py-2 px-2'>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Product Type:</label>
            <Select
              onChange={setSelectedOption}
              defaultValue={selectedOption}
              options={products}
              styles={customStyles}
              placeholder='Product Type'
              className=''
            />
          </div>












        </div>


        <div className='col-span-12 flex items-center justify-center md:col-span-6 w-full order-last md:order-none pb-4 md:pb-0'>




          <div className='w-full'>

            {uploadedImage ? (
              <div className='grid grid-cols-1 items-center mt-5 gap-4'>

                <img src={uploadedImage} className="h-[200px] " alt="Uploaded" />

                <div className='col-span-12 md:col-span-3 lg:col-span-3'>
                  {uploadProgress > 0 && (
                    <div className='flex space-x-4'>
                      <div className="w-full">
                        <div className="bg-[#444] h-4 rounded-lg overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                      <p className="text-center  text-white">{Math.round(uploadProgress)}% </p>
                      <div>
                        <button onClick={handleDeleteImage} className=' text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg></button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className=''>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="image_upload" className=" bg-[#3e3e3e] cursor-pointer bg-gray border-2 border-[#555] rounded-2xl w-full pb-4">
                    <div className='flex justify-center'>
                      <img className='w-36' src="/cloud.png" alt="" />
                    </div>
                    <span className="text-center block text-[#fff] text-lg px-2"> Choose the product image that everyone can see</span>
                    <div className='flex justify-center mt-5'>
                      <button type="button" onClick={handleUploadButtonClick} className='bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white'>Upload</button>
                    </div>
                    <input id="image_upload" className="hidden" type="file" ref={fileInputRef} onChange={handleFileInputChange} />
                  </label>
                </div>
              </div>
            )}









          </div>


        </div>
        <div className='col-span-12 md:col-span-6 w-full -mt-4'>
          <div className='py-2 px-2 relative mt-2'>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1"> From</label>

            <input
              type="date"

              className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none"
              style={{ background: 'transparent', color: 'white', width: '100%', height: '45px', WebkitAppearance: 'none' }} // Adjust width and height, and remove default appearance for iOS
              placeholder="Select Date" // Placeholder text for iOS
            />

            <style>
              {`
      /* Set placeholder color */
      ::-webkit-input-placeholder {
        color: white;
      }

      /* Style the date picker */
      input[type="date"] {
        -webkit-appearance: none; /* Remove default arrow button in Safari */
        appearance: none;
        padding: 10px; /* Adjust padding for better appearance */
        background-color: #3c3c3c; /* Set background color */
        border: 2px solid #555; /* Set border */
        border-radius: 5px; /* Set border radius */
        color: white; /* Set text color */
      }

      /* Style the date picker icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1); /* Invert the color of the icon to white */
      }
    `}
            </style>
          </div>

        </div>
        <div className='col-span-12 md:col-span-6 w-full -mt-4'>
          <div className='py-2 px-2 relative mt-2'>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1"> To</label>

            <input
              type="date"

              className="w-full bg-transparent placeholder-white hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none"
              style={{ background: 'transparent', color: 'white', width: '100%', height: '45px', WebkitAppearance: 'none' }} // Adjust width and height, and remove default appearance for iOS
              placeholder="Select Date" // Placeholder text for iOS
            />

            <style>
              {`
      /* Set placeholder color */
      ::-webkit-input-placeholder {
        color: white;
      }

      /* Style the date picker */
      input[type="date"] {
        -webkit-appearance: none; /* Remove default arrow button in Safari */
        appearance: none;
        padding: 10px; /* Adjust padding for better appearance */
        background-color: #3c3c3c; /* Set background color */
        border: 2px solid #555; /* Set border */
        border-radius: 5px; /* Set border radius */
        color: white; /* Set text color */
      }

      /* Style the date picker icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1); /* Invert the color of the icon to white */
      }
    `}
            </style>
          </div>

        </div>


        <div className='col-span-12 flex  w-full'>


          <div className='py-2 px-2 relative  w-full '>
            <label className="block text-sm text-white absolute top-1 z-10 -mt-2 ml-2 bg-[#2d2d2d] px-1">Long Description</label>

            <textarea
              rows={4} // Set the number of rows here
              className="w-full bg-transparent hover:border-gray-300 rounded-md border-2 border-[#555] text-white py-2 px-4 focus:outline-none placeholder-white" // Add placeholder color here
              required
              placeholder='description'
            />

          </div>

        </div>

        <div className='col-span-12 flex px-2  w-full -mt-3'>


          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultValue="" className="sr-only peer" />
            <div className="relative w-9 h-5 bg-[#6b6b6b] peer-focus:outline-none peer-focus:ring-none peer-focus:ring-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-[#22c55e]" />
            <span className="ms-2 text-sm  text-white">
              Adult Content
            </span>
          </label>

        </div>



        <div className='col-span-12 flex px-2  w-full -mt-1'>


          <label className="inline-flex items-center cursor-pointer ">
            <input type="checkbox" defaultValue="" className="sr-only peer" />
            <div className="relative w-9 h-5 bg-[#6b6b6b] peer-focus:outline-none peer-focus:ring-none peer-focus:ring-none  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-[#22c55e]" />
            <span className="ms-2 text-sm  text-white">
              AI
            </span>
          </label>

        </div>




      </div >









    </>

  );
};

const StepTwo = ({ nextStep }) => {

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    // Trigger click event on file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Simulate upload process (you would replace this with your actual upload logic)
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      // Simulate upload progress
      simulateUploadProgress(file);
    };
    reader.readAsDataURL(file);
  };

  const simulateUploadProgress = (file) => {
    const totalSize = file.size;
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10000; // Simulate progress by adding 10KB each interval
      const progress = Math.min((loaded / totalSize) * 100, 100);
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 100); // Simulate progress every 100 milliseconds
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
    setUploadProgress(0);
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div>
        <div className="flex items-center justify-center w-full">


          <label htmlFor="image_upload" className=" bg-[#3e3e3e]  cursor-pointer bg-gray border-2 border-[#555] rounded-2xl w-full pb-4">
            <div className='flex justify-center'>
              <img className='w-40' src="/cloud.png" alt="" />
            </div>
            <span className="text-center block text-[#fff] text-lg px-2"> Choose a nice banner image for your product everyone can see</span>
            <div className='flex justify-center mt-5'>
              <button type="button" onClick={handleUploadButtonClick} className='bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white'>Upload</button>
            </div>
            <input id="image_upload" className="hidden" type="file" ref={fileInputRef} onChange={handleFileInputChange} />
          </label>

        </div>




      </div>


      <div className='grid grid-cols-12 items-center md:mt-5 gap-4'>
        <div className='col-span-12 md:col-span-3 lg:col-span-3'>
          <img src={uploadedImage} className=" " />

        </div>
        <div className='col-span-12 md:col-span-3 lg:col-span-3'>
          {uploadProgress > 0 && (
            <div className='flex space-x-4'>
              <div className="w-full">
                <div className="bg-[#444] h-4 rounded-lg overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
              <p className="text-center  text-white">{Math.round(uploadProgress)}% </p>
              <div>
                <button onClick={handleDeleteImage} className=' text-white'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </div>

  );
};

const StepThree = ({ nextStep }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleUploadButtonClick = () => {
    // Trigger click event on file input
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    // Simulate upload process for each file
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i]);
    }
  };

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const newFiles = [...uploadedFiles, { name: file.name, url: event.target.result }];
      setUploadedFiles(newFiles);
      // Simulate upload progress
      simulateUploadProgress(file);
    };
    reader.readAsDataURL(file);
  };

  const simulateUploadProgress = (file) => {
    const totalSize = file.size;
    let loaded = 0;
    const interval = setInterval(() => {
      loaded += 10000; // Simulate progress by adding 10KB each interval
      const progress = Math.min((loaded / totalSize) * 100, 100);
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: progress,
      }));
      if (progress === 100) {
        clearInterval(interval);
      }
    }, 100); // Simulate progress every 100 milliseconds
  };

  const handleDeleteFile = (fileName) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    setUploadProgress((prevProgress) => {
      delete prevProgress[fileName];
      return { ...prevProgress };
    });
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-1">
      <div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="image_upload" className=" bg-[#3e3e3e]  cursor-pointer bg-gray border-2 border-[#555] rounded-2xl w-full pb-4">
            <div className='flex justify-center'>
              <img className='w-40' src="/cloud.png" alt="" />
            </div>
            <span className="text-center block text-[#fff] text-lg px-2">Upload all the files that buyer received after purchasing the product here</span>
            <div className='flex justify-center mt-5'>
              <button type="button" onClick={handleUploadButtonClick} className='bg-[#444] px-12 rounded-lg border-2 border-[#555] py-2 text-white'>Upload</button>
            </div>
            <input id="image_upload" className="hidden" type="file" ref={fileInputRef} onChange={handleFileInputChange} multiple />
          </label>
        </div>
      </div>

      <div className='grid grid-cols-12 items-center md:mt-5 gap-4'>
        {uploadedFiles.map((file, index) => (
          <div key={index} className='col-span-12 md:col-span-3 lg:col-span-3'>
            <p>{file.name}</p>
            {uploadProgress[file.name] && (
              <div className='flex space-x-4'>
                <div className="w-full">
                  <div className="bg-[#444] h-4 rounded-lg overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${uploadProgress[file.name]}%` }}></div>
                  </div>
                </div>
                <p className="text-center  text-white">{Math.round(uploadProgress[file.name])}% </p>
                <div>
                  <button onClick={() => handleDeleteFile(file.name)} className=' text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};



export default Modal;
