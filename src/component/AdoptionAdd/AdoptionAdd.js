import React, { useRef,useState } from 'react'
import SignHeader from '../SignHeader/SignHeader'
import {useAuth} from '../../context/AuthContext'
import { db, storage } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import {PhotographIcon } from '@heroicons/react/outline'
import {useHistory } from "react-router-dom";
function AdoptionAdd() {
    const {currentUser} = useAuth();
    const breadOfDogRef = useRef(null)
    const [photoDog,setPhotoDog] = useState(null);
    const [loading,setLoading] = useState(false)
    const captionRef = useRef(null);
    const filePhotoRef = useRef(null)
    const homeRef = useRef(null)
    const heightRef = useRef(null)
    const ageRef = useRef(null)
    const sexRef = useRef(null)
    const nameRef = useRef(null)
    const history = useHistory()
    
    const sendingDog = async (e) => {
        e.preventDefault();
        if(loading)return
        if(!captionRef.current.value)return
        if(!nameRef.current.value)return
        if(!sexRef.current.value)return
        if(!ageRef.current.value)return
        if(!heightRef.current.value)return
        if(!homeRef.current.value)return
        if(!breadOfDogRef.current.value)return
        setLoading(true)
        const docRef = await addDoc(collection(db,"dogs"),{
            caption:captionRef.current.value,
            user: currentUser.email,
            timestamp: serverTimestamp(),
            name:nameRef.current.value,
            sex:sexRef.current.value,
            age:ageRef.current.value,
            height:heightRef.current.value,
            home:homeRef.current.value,
            breadofdog:breadOfDogRef.current.value
        })  
            if(photoDog){
                const photoRef = ref(storage,`dogs.${docRef.id}/image`)  
                await uploadString(photoRef,photoDog,"data_url").then(async (snapshot) => 
                {
                    const downloadUrl = await getDownloadURL(photoRef)
                    await updateDoc(doc(db,"dogs",docRef.id),{
                        photo: downloadUrl
                    })
                })
                deleteImage();
                setPhotoDog(null)
                history.push('/adopcja')
            }
            setLoading(false)
            
        }


    const addImageToDog = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setPhotoDog(readerEvent.target.result)
        }
    }

    const deleteImage = () => {
        setPhotoDog(null)
        
    }

    return (
        <>
        <div>
        <div>
            <SignHeader></SignHeader>
        </div>
        <div className="flex justify-center items-center m-10 w-full">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Imi?? psa
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="name" ref={nameRef} type="text" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
        P??e??
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="sex" ref={sexRef} type="text" placeholder=""/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
        Wiek
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="age" ref={ageRef} type="text" placeholder="Bardzo m??ody/M??ody/Doros??y"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
        Wielko????
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="height" ref={heightRef} type="text" placeholder="Ma??y/??redni/Du??y"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="home">
        Miejsce pobytu
      </label>
      <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="home" ref={homeRef} type="text" placeholder=""/>
    </div>
    <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breadOfDog">
        Rasa
      </label>
    <select ref={breadOfDogRef} className="block appearance-none w-full
     bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
<option >Aidi</option>
<option >Airedale Terrier</option>
<option >Akita</option>
<option >Akita ameryka??ska</option>
<option >Alaskan Malamute</option>
<option>American Staffordshire Terrier</option>
<option>Ameryka??ski spaniel dowodny</option>
<option>Anatolian</option>
<option>Appenzeller</option>
<option>Ari??geois</option>
<option>Australian Cattle Dog</option>
<option>Australian Silky Terrier</option>
<option>Australian Stumpy Tail Cattle Dog</option>
<option>Azawakh - chart afryka??ski</option>
<option>Barbet</option>
<option>Basenji</option>
<option>Basset artezyjsko-norman</option>dzki
<option>Basset breto??ski</option>
<option>Basset Hound</option>
<option>Beagle</option>
<option>Beagle-Harrier</option>
<option>Bearded Collie</option>
<option>Bedlington Terrier</option>
<option>Bergamasco</option>
<option>Bernardyn</option>
<option>Berne??ski pies pasterski</option>
<option>Bia??y owczarek szwajcarski</option>
<option>Bichon Frise</option>
<option>Billy</option>
<option>Black and Tan Coonhoun</option>
<option>Bloodhound</option>
<option>Bokser</option>
<option>Bolo??czyk</option>
<option>Border Collie</option>
<option>Border Terrier</option>
<option>Boston Terrier</option>
<option>Bouvier des Ardennes</option>
<option>Bouvier des Flandres</option>
<option>Brabantczyk</option>
<option>Braque d'Auvergne</option>
<option>Braque de l'Ariege</option>
<option>Braque du Bourbonnais</option>
<option>Braque Saint-Germain</option>
<option>Broholmer</option>
<option>Buldog angielski</option>
<option>Buldog francuski</option>
<option>Bullmastiff</option>
<option>Bulterier</option>
<option>Bulterier miniaturowy</option>
<option>Cairn Terrier</option>
<option>Canaan Dog</option>
<option>Cane Corso Italiano</option>
<option>C??o da Serra da Estrela</option>
<option>C??o de Castro Laboreiro</option>
<option>C??o Fila de S??o Miguel</option>
<option>Cavalier King Charles Spaniel</option>
<option>Ceskoslovensk?? Vlcak</option>
<option>Charcik w??oski</option>
<option>Chart afga??ski</option>
<option>Chart hiszpa??ski</option>
<option>Chart perski</option>
<option>Chart polski</option>
<option>Chart rosyjski borzoj</option>
<option>Chart szkocki</option>
<option>Chart w??gierski</option>
<option>Chesapeake Bay Retriever</option>
<option>Chien d'Artois</option>
<option>Chihuahua</option>
<option>Chin japo??ski</option>
<option>Chi??ski grzywacz</option>
<option>Chow Chow</option>
<option>Cimarron Uruguayo</option>
<option>Ciobanesc Romanesc Carpatin</option>
<option>Ciobanesc Romanesc</option>
<option>Mioritic</option>
<option>Cirneco dell'Etna</option>
<option>Clumber Spaniel</option>
<option>Cocker spaniel ameryka??ski</option>
<option>Cocker spaniel angielski</option>
<option>Coton de Tul??ar</option>
<option>Curly Coated Retriever</option>
<option>Czarny terier</option>
<option>Czuwacz s??owacki</option>
<option>Dalmaty??czyk</option>
<option>Dandie Dinmont Terrier</option>
<option>Doberman</option>
<option>Dog argenty??ski</option>
<option>Dog kanaryjski</option>
<option>Dog niemiecki</option>
<option>Dog z Majorki</option>
<option>Dogue de Bordeaux</option>
<option>Drentsche Patrijshond</option>
<option>Du??sko-szwedzki pies wiejski</option>
<option>Du??y go??czy anglo-francuski bia??o-czarny</option>
<option>Du??y go??czy anglo-francuski bia??o-pomara??czowy</option>
<option>Du??y go??czy anglo-francuski tr??jkolorowy</option>
<option>Du??y go??czy gasko??ski</option>
<option>Du??y m??nsterl??nder</option>
<option>Du??y szwajcarski pies pasterski</option>
<option >Elkhund czarny</option>
<option>Elkhund szary</option>
<option>English Toy Terrier</option>
<option>Entlebucher</option>
<option>Epagneul bleu de Picardie</option>
<option>Epagneul Breton</option>
<option>Epagneul de Pont-Audemer</option>
<option>Epagneul fran??ais</option>
<option>Epagneul picard</option>
<option>Eurasier</option>
<option>Field Spaniel</option>
<option>Fila Brasileiro</option>
<option>Flat Coated Retriever</option>
<option>Foksterier kr??tkow??osy</option>
<option>Foksterier szorstkow??osy</option>
<option>Foxhound ameryka??ski</option>
<option>Foxhound angielski</option>
<option>Fryzyjski pies dowodny</option>
<option>Golden Retriever</option>
<option>Go??czy bo??niacki szorstkow??osy Barak</option>
<option>Go??czy chorwacki</option>
<option>Go??czy francuski bia??o-czarny</option>
<option>Go??czy francuski bia??o-pomara??czowy</option>
<option>Go??czy francuski tr??jkolorowy</option>
<option>Go??czy Hamiltona</option>
<option>Go??czy hiszpa??ski</option>
<option>Go??czy istryjski kr??tkow??osy</option>
<option>Go??czy istryjski szorstkow??osy</option>
<option>Go??czy polski</option>
<option>Go??czy Schillera</option>
<option>Go??czy s??owacki</option>
<option>Go??czy szwajcarski</option>
<option>Grand Basset griffon vend??en</option>
<option>Grand gascon saintongeois</option>
<option>Greyhound</option>
<option>Gryfon Korthalsa</option>
<option>Gryfonik belgijski</option>
<option>Gryfonik brukselski</option>
<option>Hawa??czyk</option>
<option>Hiszpa??ski pies dowodny</option>
<option>Hokkaido</option>
<option>Hollandse Smoushond</option>
<option>Hovawart</option>
<option>Irish Glen of Imaal Terrier</option>
<option>Irish Soft Coated Wheaten Terrier</option>
<option>Irlandzki spaniel dowodny</option>
<option>Islandzki szpic pasterski</option>
<option>Jack Russell Terrier</option>
<option>Jamnik d??ugow??osy</option>
<option>Jamnik kr??tkow??osy</option>
<option>Jamnik szorstkow??osy</option>
<option>J??mthund</option>
<option>Jindo</option>
<option>Kangal</option>
<option>Karelski pies na nied??wiedzie</option>
<option>Kerry Blue Terrier</option>
<option>King Charles Spaniel</option>
<option>Kishu</option>
<option>Komondor</option>
<option>Kooikerhondje</option>
<option>Kraski Ovcar</option>
<option>Kromfohrl??nder</option>
<option>Kuvasz</option>
<option>Labrador Retriever</option>
<option>Lagotto romagnolo</option>
<option>Lakeland Terrier</option>
<option>Landseer (typ kontyntalno-europejski)</option>
<option>Lapinporokoira</option>
<option>Leonberger</option>
<option>Lhasa Apso</option>
<option>Lwi piesek</option>
<option>??ajka rosyjsko-europejska</option>
<option>??ajka wschodniosyberyjska</option>
<option>??ajka zachodniosyberyjska</option>
<option>Malta??czyk</option>
<option>Ma??y go??czy anglo-francuski</option>
<option>Ma??y go??czy gasko??ski</option>
<option>Ma??y m??nsterl??nder</option>
<option>Manchester Terrier</option>
<option>Maremmano-Abruzzese</option>
<option>Mastif angielski</option>
<option>Mastif hiszpa??ski</option>
<option>Mastif neapolita??ski</option>
<option>Mastif pirenejski</option>
<option>Mastif tybeta??ski</option>
<option>Mieszaniec</option>
<option>Mops</option>
<option>Mudi</option>
<option>Nagi pies meksyka??ski</option>
<option>Nagi pies peruwia??ski</option>
<option>Niemiecki terier my??liwski</option>
<option>Norfolk Terrier</option>
<option>Norrbottenspets</option>
<option>Norsk Buhund</option>
<option>Norsk Lundehund</option>
<option>Norwich Terrier</option>
<option>Nova Scotia Duck Tolling Retriever</option>
<option>Nowofundland</option>
<option>Ogar polski</option>
<option>Otterhound</option>
<option>Owczarek australijski - Kelpie</option>
<option>Owczarek australijski (typ ameryka??ski)</option>
<option>Owczarek belgijski</option>
<option>Owczarek chorwacki</option>
<option>Owczarek francuski - Beauceron</option>
<option>Owczarek francuski - Briard</option>
<option>Owczarek holenderski</option>
<option>Owczarek katalo??ski</option>
<option>Owczarek kaukaski</option>
<option>Owczarek niemiecki</option>
<option>Owczarek pikardyjski</option>
<option>Owczarek pirenejski (a face rase)</option>
<option>Owczarek pirenejski (a poil long)</option>
<option>Owczarek po??udnioworosyjski - Ju??ak</option>
<option>Owczarek portugalski</option>
<option>Owczarek ??rodkowoazjatycki</option>
<option>Owczarek staroangielski - Bobtail</option>
<option>Owczarek szetlandzki</option>
<option>Owczarek szkocki d??ugow??osy</option>
<option>Owczarek szkocki kr??tkow??osy</option>
<option>Owczarek z Majorki</option>
<option>Papillon</option>
<option>Parson Russell Terrier</option>
<option>Peki??czyk</option>
<option>Petit Basset griffon vend??en</option>
<option>Pies Faraona</option>
<option>Pies grenlandzki</option>
<option>Pies pasterski z Bukowiny</option>
<option>Pinczer austriacki</option>
<option>Pinczer ma??pi</option>
<option>Pinczer miniaturowy</option>
<option>Pinczer ??redni</option>
<option>Pirenejski pies g??rski</option>
<option>Pitbull</option>
<option>P??ochacz niemiecki - Wachtelhund</option>
<option>Podenco kanaryjski</option>
<option>Podenco z Ibizy</option>
<option>Podengo portugalski</option>
<option>Pointer</option>
<option>Poitevin</option>
<option>Polski owczarek nizinny</option>
<option>Polski owczarek podhala??ski</option>
<option>Porcelaine</option>
<option>Portugalski pies dowodny</option>
<option>Pudel</option>
<option>Pudelpointer</option>
<option>Puli</option>
<option>Pumi</option>
<option>Rafeiro do Alentejo</option>
<option>Rhodesian Ridgeback</option>
<option>Rosyjski toy</option>
<option>Rottweiler</option>
<option>Saarlooswolfhond</option>
<option>Samoyed</option>
<option>Sarplaninac</option>
<option>Schapendoes</option>
<option>Schipperke</option>
<option>Sealyham Terrier</option>
<option>Seter angielski</option>
<option>Seter irlandzki</option>
<option>Seter irlandzki czerwono-bia??y</option>
<option>Seter szkocki - Gordon</option>
<option>Shar Pei</option>
<option>Shiba</option>
<option>Shih Tzu</option>
<option>Shikoku</option>
<option>Siberian Husky</option>
<option>Skye Terrier</option>
<option>Slughi - Chart arabski</option>
<option>Spaniel tybeta??ski</option>
<option>Springer spaniel angielski</option>
<option>Springer spaniel walijski</option>
<option>Staffordshire Bull Terrier</option>
<option>Suomenlapinkoira</option>
<option>Sussex Spaniel</option>
<option>Svensk Lapphund</option>
<option>Sznaucer miniaturowy</option>
<option>Sznaucer olbrzym</option>
<option>Sznaucer ??redni</option>
<option>Szpic fi??ski</option>
<option>Szpic japo??ski</option>
<option>Szpic miniaturowy (Pomeranian)</option>
<option>Szpic wilczy</option>
<option>Szpic w??oski</option>
<option>Szpice niemieckie</option>
<option>Terier australijski</option>
<option>Terier brazylijski</option>
<option>Terier czeski</option>
<option>Terier irlandzki</option>
<option>Terier japo??ski</option>
<option>Terier szkocki</option>
<option>Terier tybeta??ski</option>
<option>Terier walijski</option>
<option>Thai Bangkaew Dog</option>
<option>Thai Ridgeback Dog</option>
<option>Tornjak</option>
<option>Tosa</option>
<option>V??stg??taspets</option>
<option>Welsh Corgi Cardigan</option>
<option>Welsh Corgi Pembroke</option>
<option>West Highland White Terrier</option>
<option>Whippet</option>
<option>Wilczarz irlandzki</option>
<option>Wy??e?? czeski szorstkow??osy - Fousek</option>
<option>Wy??e?? du??ski</option>
<option>Wy??e?? fryzyjski</option>
<option>Wy??e?? gasko??ski</option>
<option>Wy??e?? hiszpa??ski z Burgos</option>
<option>Wy??e?? niemiecki d??ugow??osy</option>
<option>Wy??e?? niemiecki kr??tkow??osy</option>
<option>Wy??e?? niemiecki ostrow??osy</option>
<option>Wy??e?? niemiecki szorstkow??osy</option>
<option>Wy??e?? pirenejski</option>
<option>Wy??e?? portugalski</option>
<option>Wy??e?? s??owacki szorstkow??osy (Ohar)</option>
<option>Wy??e?? w??gierski kr??tkow??osy</option>
<option>Wy??e?? w??gierski szorstkow??osy</option>
<option>Wy??e?? weimarski</option>
<option>Wy??e?? w??oski kr??tkow??osy</option>
<option>Wy??e?? w??oski szorstkow??osy</option>
<option>Yorkshire Terrier</option>
  </select>
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
  </div>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caption">
        Opis
      </label>
      <input className="shadow appearance-none border  rounded w-full h-auto py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
      id="caption" ref={captionRef} type="text" placeholder=""/>
    </div>
    <div className="flex items-center justify-center ">
      <button type='submit' onClick={sendingDog}  className="uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300" >
        Dodaj
      </button>
      {photoDog  && (
                <div onClick={deleteImage} className='flex flex-col cursor-pointer tra transform hover:scale-150'>
                    <img src={photoDog} className='h-5 object-contain rounded-t-md' alt=''></img>
                    <p className='h-4 '>Usu??</p>
                </div>
            )}
      <div onClick={()=> filePhotoRef.current.click()} className='inputIcon'>
                <PhotographIcon className='h-5'/>
                <p className='text-center'>Zdj??cie</p>
                <input ref={filePhotoRef} type="file" hidden onChange={addImageToDog} ></input>
            </div>
    </div>
  </form>
</div>
</div>
</>
    )
}

export default AdoptionAdd
