'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import ImageSplitter from "~/components/ImageSplitter";
import {useCommonContext} from "~/context/common-context";

const PageComponent = ({
                         locale = '',
                         indexTestimonialText,
                         indexPlayInfoText,
                         navMenuText,
                         indexLanguageText,
                         indexFeatureText,
                         initVideoList = [],
                         questionText
                       }) => {
  const router = useRouter();

  const [textStr, setTextStr] = useState('');
  const {setShowGeneratingModal, setShowLoadingModal} = useCommonContext();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setChooseAPI('FakeSora');
    if (!textStr) {
      setVideoList(randomVideo(2));
      return;
    }
    setShowGeneratingModal(true);
    const body = {
      prompt: textStr
    };
    const response = await fetch(`/${locale}/api/generate`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    const result = await response.json();
    setShowGeneratingModal(false);
    if (result.data) {
      if (!result.data[0].revised_prompt) {
        return
      }
      const video = {
        revised_prompt: result.data[0].revised_prompt,
        url: result.data[0].url
      }

      // add storage
      const videoHistoryListStr = localStorage.getItem('videoHistoryList');
      if (!videoHistoryListStr) {
        const videoHistoryList = [];
        videoHistoryList.unshift(video);
        localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
      } else {
        const videoHistoryList = JSON.parse(videoHistoryListStr);
        // check exist
        let exist = false;
        for (let i = 0; i < videoHistoryList.length; i++) {
          const videoHistory = videoHistoryList[i];
          if (videoHistory.revised_prompt == video.revised_prompt) {
            exist = true;
            localStorage.setItem('video', JSON.stringify(video));
            router.push(`/${locale}/playground`)
            return;
          }
        }
        if (!exist) {
          videoHistoryList.unshift(video);
          // const newList = videoHistoryList.slice(0, 3);
          localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
        }
      }
      localStorage.setItem('video', JSON.stringify(video));
      router.push(`/${locale}/playground`)
    }
  }

  const [videoList, setVideoList] = useState(initVideoList);

  const handleMouseEnter = (event) => {
    event.target.play();
  };

  const handleMouseLeave = (event) => {
    event.target.pause();
  };

  const [chooseAPI, setChooseAPI] = useState('FakeSora');

  return (
    <>
      <HeadInfo
        title={indexLanguageText.title}
        description={indexLanguageText.description}
        locale={locale}
        page={""}
      />
      <Header locale={locale} navMenuText={navMenuText} indexLanguageText={indexLanguageText}/>
      <div>
        <div className="block overflow-hidden bg-cover bg-center text-black"
             style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
          <div className="mx-auto w-full max-w-7xl px-5 mb-5">
            
            <div
              className="mx-auto flex max-w-4xl flex-col items-center text-center py-10">
              <h1 className="mb-4 text-4xl font-bold md:text-4xl">{indexLanguageText.h1Text}</h1>

            </div>

            <div
                className={"w-[90%] mx-auto mb-8 border-[2px] border-gray-200 object-fill"}>
                <ImageSplitter locale={locale} indexLanguageText={indexLanguageText}/>
            </div>

            <section id="how-it-works" className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{indexPlayInfoText.h2_0}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-play w-12 h-12 text-indigo-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{indexPlayInfoText.h2_1}</h3>
                    <p className="text-gray-600 text-center">{indexPlayInfoText.h2_1_p1}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mouse-pointer w-12 h-12 text-indigo-600">
                        <path d="M12.586 12.586 19 19"></path>
                        <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{indexPlayInfoText.h2_2}</h3>
                    <p className="text-gray-600 text-center">{indexPlayInfoText.h2_2_p1}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move w-12 h-12 text-indigo-600">
                        <path d="M12 2v20"></path>
                        <path d="m15 19-3 3-3-3"></path>
                        <path d="m19 9 3 3-3 3"></path>
                        <path d="M2 12h20"></path>
                        <path d="m5 9-3 3 3 3"></path>
                        <path d="m9 5 3-3 3 3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{indexPlayInfoText.h2_3}</h3>
                    <p className="text-gray-600 text-center">{indexPlayInfoText.h2_3_p1}</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big w-12 h-12 text-indigo-600">
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{indexPlayInfoText.h2_4}</h3>
                    <p className="text-gray-600 text-center">{indexPlayInfoText.h2_4_p1}</p></div>
                </div>
              </div>
            </section>
            
            

            <section id="testimonials" className="py-16 bg-indigo-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">{indexTestimonialText.h2_0}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-center mb-4">
                    {indexTestimonialText.h2_1_p1}                      
                    </p>
                    <p className="text-gray-800 font-semibold">Sarah J.</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-gray-300">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-center mb-4">
                    {indexTestimonialText.h2_2_p1}                              </p>
                    <p className="text-gray-800 font-semibold">Mike T.</p></div>
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star w-5 h-5 text-yellow-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-center mb-4">
                    {indexTestimonialText.h2_3_p1}                            </p>
                    <p className="text-gray-800 font-semibold">Emily R.</p></div>
                </div>
              </div>
            </section>


            <div id="faq">
              <section>
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 py-16 md:px-10 md:py-20">
                  <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-black">{questionText.h2_0}</h2>
                  </div>
                  <div className="mt-10 flex w-full flex-col">
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_1}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_1_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_2}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_2_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_3}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_3_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_4}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_4_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_5}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_5_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_6}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_6_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                    <div className="relative my-3 w-full rounded-md px-6 py-8">
                      <div className="max-w-full">
                        <h3 className="text-xl font-bold text-black mb-4">{questionText.h2_7}</h3>
                        <p className="font-inter text-base font-light text-gray-500 text-justify">{questionText.h2_7_p1}</p>
                      </div>
                    </div>
                    <div className="mr-4 ml-8 border border-gray-200"></div>
                  </div>
                </div>
              </section>
            </div>

          </div>

          

        </div>
      </div>
      
            <Footer
              locale={locale}
              description={indexLanguageText.description}
            />
    </>
  )


}
export default PageComponent