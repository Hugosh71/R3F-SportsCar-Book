import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const pictures = [
  "car",
  "car2",
  "car3",
  "car4",
  "car5",
  "car6",
  "car7",
  "car8",
  "car9",
  "car10",
  "car11",
  "car12",
  "car13",
  "car14",
  "car15",
  "car16",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "carcover",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "carback",
});



export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setPage((prevPage) => {
          if (prevPage < pages.length) {
            return prevPage + 1;
          } else {
            return prevPage; 
          }
        });
      } else if (event.key === "ArrowLeft") {
        setPage((prevPage) => {
          if (prevPage > 0) {
            return prevPage - 1;
          } else {
            return prevPage; 
          }
        });
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return ( null
  );
};
