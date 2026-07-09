
const banner = ()=>{
    return `\
    <script>
  atOptions = {
    'key' : '2a6014fc45b670959a6a94c3d8fef5c7',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/2a6014fc45b670959a6a94c3d8fef5c7/invoke.js"></script>

    `
}

const Ad = ()=>{
    
    return(
        <>
            <div
            className="my-4 bg-red-500 w-full h-24 flex justify-center items-center"
             id="ad" dangerouslySetInnerHTML={{ __html: banner() }} />
        </>
    )
}

export default Ad;