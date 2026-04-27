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
convert.addEventListener('click', async () => {
    to = document.getElementById("to").value;
    const user_file_send = file_c.files[0];
    const formData = new FormData();
    formData.append("photo", user_file_send);
    formData.append("to", to);
    const response = await fetch("/convert",{ method: "post", body: formData});
    // if (!response.ok) {
    // alert(await response.text());
    // return;}
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