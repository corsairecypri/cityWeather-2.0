
const r = async (data) => {
/*On envoie l'objet { city : data } dans notre requête*/
const {
    data: { result },
} = await axios.post("/suggestion", { city: data });
console.log(result);

/*On crée les élément de la liste*/
document.getElementById("suggestion").innerHTML = "";
result.forEach((city) => {
    document.getElementById("suggestion").innerHTML += `
                <li>
                    <p>${city}</p>
                </li>
            `;
});

/*Puis quand on clique sur une suggestion, le texte de la recherche change en conséquence*/
document.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", (e) => {
    document.getElementById("bar").value = e.target.textContent.trim();
    });
});
};
/*On détecte les évènements*/

const bar = document.getElementById("bar");

bar.addEventListener("blur", () => {
r(document.getElementById("bar").value);
});
bar.addEventListener("change", () => {
r(document.getElementById("bar").value);
});
bar.addEventListener("focus", () => {
r(document.getElementById("bar").value);
});
bar.addEventListener("keyup", () => {
r(document.getElementById("bar").value);
if (document.getElementById("bar").value === "") {
    document.getElementById("suggestion").innerHTML = "";
}
});
bar.addEventListener("paste", () => {
r(document.getElementById("bar").value);
});
