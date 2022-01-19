import default_texts from "../../Domain/default_texts";

const texts_library = new default_texts();


/**
 * Render the HomePage
 */

 const toRender = () => {
    let page =` 
    <div class = "container mt-5">
      <form id="formulaire">
        <p><textarea id="textUtilisateur" name="textUtilisateur" rows="15" cols="80"></textarea></p>

        <select name="difficulte" id="difficulte">
            <option value="default">Veuillez choisir un niveau</option>
            <option value="facile">facile</option>
            <option value="moyen">moyen</option>
            <option value="difficule">difficile</option>
        </select>

        <p><button type="submit" class="btn btn-primary mt-2" id="submit">Envoyer</button></p>

        <div class="alert alert-info mt-2" role="alert" id="info">
            Statut opération
        </div>
  
      </form>
        
    <div>`;
    return page;
  }

const CreateTextPage = async () => { 
    
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = toRender();
    let ajouterButton = document.getElementById("submit");
    let level = document.getElementById("difficulte");
    let text = document.getElementById("textUtilisateur");
    let formulaire = document.getElementById("formulaire");
    let info = document.getElementById("info");

    ajouterButton.addEventListener("click",async (e) =>{
        e.preventDefault();
        
        let _text = {
          content: text.value,
          level: level.value
        }
        let result = await texts_library.addText(_text);
        if(result==true){
          info.innerHTML="Enregistré";
          formulaire.reset();
        }
        else if(result== false){
          info.innerHTML="Elements manquant à l'insertion";
        }
        else{
          info.innerHTML=result;
        }
        
            
    })
  };
  
  export default CreateTextPage;