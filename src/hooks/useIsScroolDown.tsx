import { useEffect, useRef,  useState } from "react";


const useIsScroolDown = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isScrollDown, setIsScrollDown] = useState(null);
    const lastScrollY = useRef(0);

    //futre fot delta scroll
    const [scrollDelta, setScrollDelta] = useState(0);
    const startScrollY = useRef<number | null>(null);
    const lastScrollTime = useRef<number | null>(null);

    useEffect(()=>{
        const handleScrollY = ()=>{
            setScrollY(window.scrollY)
        }
        window.addEventListener("scroll", handleScrollY)
        return()=>{
            window.removeEventListener("scroll", handleScrollY)
        }
    }, [])
    useEffect(()=>{
        const handleScroll = ()=>{
            const currentScrollY = window.scrollY;
            if(currentScrollY > lastScrollY.current){
                // console.log("scrolling down")
                setIsScrollDown(true)
            }
            else if(currentScrollY < lastScrollY.current){
                // console.log("scrolling up")
                setIsScrollDown(false);
            }
            //for delta scroll
            const now = Date.now();
            if (startScrollY.current === null) {
                startScrollY.current = currentScrollY;
            }
            setScrollDelta(
                Math.abs(currentScrollY - startScrollY.current)
            );
            lastScrollTime.current = now;
            //when user stops then rest the value
            setTimeout(() => {
                if (
                    lastScrollTime.current &&
                    Date.now() - lastScrollTime.current > 120
                ) {
                    startScrollY.current = null;
                    setScrollDelta(0);
                }
            }, 120);
            // console.log("delta scroll: ", scrollDelta)

            lastScrollY.current = currentScrollY;
        }
        window.addEventListener("scroll", handleScroll);
        return()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    },[scrollDelta])
    return [isScrollDown, scrollY, scrollDelta];
}

export default useIsScroolDown