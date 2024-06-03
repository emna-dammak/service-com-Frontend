import React from "react";

const PlansArticle = () => {
  return (
    <div className="w-1128 flex justify-center mt-8"> 
      <div className="flex gap-8 flex-grow">
     
        <div style={{background: "rgba(115, 103, 240, 0.08)",width: "552px",height: "176px",padding: "24px",display: "flex",flexDirection: "row",justifyContent: "space-between", borderRadius: "6px", }}>
          
          <div className="flex flex-col" style={{width: "300px", height: "128px" }}>
           
            <div style={{width: "300px", height: "30px"}}>
              <span
                className="font-public-sans text-lg font-medium"
                style={{ color: "rgba(115, 103, 240, 1)" }}
              >
                Become A Service Provider
              </span>
            </div>

            <div style={{width: "300px", height: "60px"}}>
              <span
                className="font-public-sans text-sm font-normal"
                style={{ color: "rgba(75, 70, 92, 1)" }}
              >
                Choose between our Service Provider Plans and Start Selling!
              </span>
            </div>

            <div style={{ cursor:"pointer",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "121px", height: "38px", borderRadius: "6px", background: "rgba(115, 103, 240, 1)" }}>
                <button
                 className="font-public-sans text-lg font-medium"
                 style={{ color: "white" }}
                 >
                    View Plans
                </button>
            </div>


         </div>
           

         <div style={{ width: '180px', height: '127px', borderRadius: '6px', backgroundColor: 'rgba(115, 103, 240, 0.16)', display: 'flex', justifyContent: "center",alignItems: "end" }}>
             <img src="/boy.png" alt="Boy" className="w-90 h-119" />
            </div>


          </div>

          <div style={{background: "rgba(234, 84, 85, 0.08)",width: "552px",height: "176px",padding: "24px",display: "flex",flexDirection: "row",justifyContent: "space-between", borderRadius: "6px", }}>

        <div className="flex flex-col" style={{width: "300px", height: "128px" }}>
           
           <div style={{width: "300px", height: "30px"}}>
             <span
               className="font-public-sans text-lg font-medium"
               style={{ color: "rgba(234, 84, 85, 1)" }}
             >
               Quality Assured.
             </span>
           </div>

           <div style={{width: "300px", height: "60px"}}>
             <span
               className="font-public-sans text-sm font-normal"
               style={{ color: "rgba(75, 70, 92, 1)" }}
             >
               Check out this article where we provide information about our Selection Process.
             </span>
           </div>

           <div style={{ cursor:"pointer",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "121px", height: "38px", borderRadius: "6px", background: "rgba(234, 84, 85, 1)" }}>
               <button
                className="font-public-sans text-lg font-medium"
                style={{ color: "white"}}
                >
                   View Article
               </button>
           </div>


        </div>
          

        <div style={{ width: '180px', height: '127px', borderRadius: '6px', backgroundColor: 'rgba(234, 84, 85, 0.16)', display: 'flex', justifyContent: "center",alignItems: "end" }}>
            <img src="/girl.png" alt="Girl" className="w-90 h-119" />
           </div>


         </div>

         
        </div>
      </div>
  );
};

export default PlansArticle;
