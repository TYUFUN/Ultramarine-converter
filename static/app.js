const file_c = document.getElementById("ttt");
const your_f = document.getElementById("your_f");
const our_f = document.getElementById("our_f");
const dwn = document.getElementById("dwn");
let to;
file_c.addEventListener('change', () => {
    const user_file = file_c.files[0];
    your_f.src = URL.createObjectURL(user_file);

});
const convert = document.getElementById("convert");
const er413 = document.getElementById("er413");
const globaler = document.getElementById("globaler");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function bg(text) {
            er413.innerHTML = text;
            er413.style.display = 'block';
            await sleep(5000);
            er413.style.display = "none";
};
convert.addEventListener('click', async () => {
    to = document.getElementById("to").value;
    const user_file_send = file_c.files[0];
    const formData = new FormData();
    convert.innerHTML = "Loading...";
    formData.append("photo", user_file_send);
    formData.append("to", to);
    const response = await fetch("/convert",{ method: "post", body: formData});
    convert.innerHTML = "Convert";
    if (!response.ok ) {
        const data = await response.json();
        if (response.status == 400){
            bg("Error 400. probably wrong photo uploaded")}
        else if (response.status == 422){
            bg("File not uploaded")
        }
        else{
            bg(data.detail)
        }
        document.getElementById("er413").scrollIntoView({ behavior: "smooth" });
        return;
};
    const blob = await response.blob(); 
    our_f.src = URL.createObjectURL(blob);  
});
dwn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = our_f.src;
    if (to){
        a.download = `result.${to}`;
        a.click();
    }
});
const typee = document.getElementById("types");
typee.style.display = "none";
const fix = document.getElementById("fix");
fix.addEventListener('click', () => {
    const types = document.getElementById("types");
    if (types.style.display == "none"){
        types.style.display = "block";
        fix.innerHTML = "▿Which photo extensions you can upload?";
    }
    else if(types.style.display == "block"){
        types.style.display = "none";
        fix.innerHTML = "▹Which photo extensions you can upload?";
    }
});