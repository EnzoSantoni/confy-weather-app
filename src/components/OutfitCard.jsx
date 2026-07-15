
function getOutfit(temp, pop) {
    let items = [];
    let desc = "";

    if(temp < 5) {
        items.push({emoji:"🧣", label:"Bufanda"}, {emoji:"🧤", label:"Guantes"}, {emoji:"🧥", label:"Campera de invierno"}, {emoji:"👖", label:"Pantalón largo"}, {emoji:"👟", label:"Zapatillas"});
        desc = "Hace un frío bravo. Abrigate bien de pies a cabeza, no salgas sin bufanda.";
    } else if(temp < 10) {
        items.push({emoji:"🧥", label:"Campera de abrigo"}, {emoji:"👕", label:"Buzo"}, {emoji:"👖", label:"Pantalón largo"}, {emoji:"👟", label:"Zapatillas"});
        desc = "Bastante frío. Un buen abrigo y capas adentro para no pasar frío.";
    } else if(temp < 18) {
        items.push({emoji:"🧥", label:"Campera liviana"}, {emoji:"👕", label:"Remera"}, {emoji:"👖", label:"Pantalón largo"}, {emoji:"👟", label:"Zapatillas"});
        desc = "Fresco pero manejable. Capas livianas que puedas sacarte al mediodía.";
    } else if(temp < 25) {
        items.push({emoji:"👕", label:"Remera"}, {emoji:"🩳", label:"Short"}, {emoji:"🕶️", label:"Anteojos"}, {emoji:"👡", label:"Sandalias"});
        desc = "Temperatura agradable. Ropa cómoda y liviana, nada de abrigo.";
    } else {
        items.push({emoji:"👕", label:"Remera"}, {emoji:"🩳", label:"Short"}, {emoji:"🕶️", label:"Anteojos"}, {emoji:"👡", label:"Sandalias"});
        desc = "Hace calor. Ropa fresca, hidratate y cuidate del sol.";
    }

    if(pop >= 0.4) {
        items.push({emoji:"☂️", label:"Paraguas"})
        desc += " Además, hay chances de lluvia — llevá paraguas.";
    }

    return {desc, items}
}

export default function OutfitCard({data, forecast}) {

    const {desc, items} = getOutfit(data.main.feels_like, forecast.list[0].pop)



    return (
        <>
            <div className="description">
                <h3>¿Qué me pongo?</h3>
                <p>
                    {Math.round(data.main.feels_like)+ "° " + desc}
                </p>
            </div>
            <div className="outfit-items">
                {items.map((o) => (
                    <div className="outfit-item" key={o.label}>
                        <span className="outfit-emoji">{o.emoji}</span>
                        <span className="outfit-label">{o.label}</span>
                    </div>
                ))}
            </div>
        </>
    )
}