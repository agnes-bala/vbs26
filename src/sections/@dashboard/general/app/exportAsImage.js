import html2canvas from "html2canvas";


const exportAsImage = async (element, imageFileName) => {
 
    // const html = document.getElementsByTagName("html")[0];
    // const body = document.getElementsByTagName("body")[0];
    const canvas = await html2canvas(element,{
        logging: true,
        letterRendering: 1,
        allowTaint: false,
        useCORS: true});
    var ctx = canvas.getContext('2d');

    ctx.webkitImageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;
    ctx.allowTaint =true;

    const image = canvas.toDataURL("image/png", 1.0);
    // var doc = new jsPDF('p','mm','b5');
        //         doc.addImage(image, 'PNG',50,20);
        //         doc.setFillColor(204, 204,204,0);
        //   doc.rect(50, 20, 65, 200);  
        //         doc.save('sample-file.pdf');
     downloadImage(image, imageFileName);
    };

    const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;
    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
    };
    
    export default exportAsImage;