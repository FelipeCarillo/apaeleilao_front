import { useEffect, useState, useRef } from "react";
import Modal from 'react-modal';
import moment from "moment";
import CurrencyInput from "react-currency-input-field";
import { ToastContainer, toast } from 'react-toastify';
import { func } from "prop-types";

export default function CardCriados({data}){
    const [closeModalD, setCloseModalD] = useState(false);

    const [images, setImages] = useState([]);
    const [nome, setNome] = useState("Nome do Produto");
    const [valor, setValor] = useState("Valor do Produto");
    const [desc, setDesc] = useState("");
    const [abertura, setAbertura] = useState("xx/xx/xx xx:xx");
    const [duracao, setDuracao] = useState("xx:xx");
    const [imageNumber, setImageNumber] = useState(0);

    const [idModal, setIdModal] = useState("");
    const focusScreen = useRef(null);
    function fecharTecla(tecla) {
        if (tecla.key === "Escape") {
          setCloseModalD(false);
        }
    }
    function convertData (data) {
      var date = new Date(data*1000);
      return date.toLocaleDateString();
    }
    function convertDuration (data1, data2) {
      var date1 = new Date(data1 * 1000);
      var date2 = new Date(data2 * 1000);
      // Calcula a diferença em horas e minutos
      var diffHours = moment(date2).diff(moment(date1), 'hours');
      var diffMinutes = moment(date2).diff(moment(date1), 'minutes') % 60;
      // Formata a diferença com dois dígitos para horas e minutos
      var formattedHours = diffHours.toString().padStart(2, '0');
      var formattedMinutes = diffMinutes.toString().padStart(2, '0');
      return formattedHours + ":" + formattedMinutes;
    }

    // Foco no modal pra fechar com o ESC
    useEffect(() => {
      // Confere se o closeModalD está definido e focusScreen.current existe
      if (closeModalD && focusScreen.current) {
        focusScreen.current.focus();
      }
    }, [closeModalD]);
    
    // Modal Delete
    function createModalD(auction_id, title){
        setCloseModalD(true);
        console.log(auction_id);
        setNome(title);
        setIdModal(auction_id);
    }
    
    function deletarEvento(auction_id){
        setCloseModalD(false);
        console.log(auction_id + " deletado com sucesso!");
        fetch(process.env.REACT_APP_API + "/delete-auction?auction_id=" + auction_id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
            });
    }

    // Modal Edit
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModalE(infos) {
      // abre o modal
      setIsOpen(true);

      // seta as infos
      setIdModal(infos.auction_id);
      setNome(infos.title);
      setValor(infos.start_amount);
      setDesc(infos.description);
      setAbertura(moment(infos.start_date*1000).format("YYYY-MM-DDTHH:mm"));
      setDuracao(convertDuration(infos.start_date, infos.end_date));
      setImages(infos.images);
      setImageNumber(0);

      // saveImagesEdit(infos.images);
    }

    //Funções para o modal Edit
    function prox() {
      document.getElementById("ladoEsq").classList.remove("hidden");
      document.getElementById("ladoDir").classList.add("hidden");
      document.getElementById("botao_cel_prox").classList.add("hidden");
      document.getElementById("proxBot").classList.remove("hidden");
    }
  
    function back() {
      document.getElementById("ladoEsq").classList.add("hidden");
      document.getElementById("ladoDir").classList.remove("hidden");
      document.getElementById("botao_cel_prox").classList.remove("hidden");
      document.getElementById("proxBot").classList.add("hidden");
    }

    function toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }

    function addImage() {
      // const files = document.getElementById("upload-photo").files;
    
      // const newImagesPromises = Array.from(files).map((file) => {
      //   return new Promise((resolve) => {
      //     toDataURL(URL.createObjectURL(file), function (dataUrl) {
      //       resolve({
      //         image: URL.createObjectURL(file),
      //         image_base64: dataUrl,
      //       });
      //     });
      //   });
      // });
    
      // Promise.all(newImagesPromises).then((newImages) => {
      //   setImages((prevImages) => [...prevImages, ...newImages]);
      //   Array.from(files).forEach((file) => URL.revokeObjectURL(file));
    
      //   // Mostrar a última imagem adicionada
      //   const lastImage = newImages[newImages.length - 1];
      //   const cardImage = document.getElementById("cardImage");
      //   cardImage.innerHTML = `<img src="${lastImage.image}" class="rounded-t-3xl h-[280px] w-[100%]"/>`;
    
      //   // Atualizar a posição para a última imagem
      //   setImageNumber(images.length);
      //   console.log(images);
      // });
      return toast.info("Aviso função de adição de imagens para a edição de leilões ainda indisponível!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

    function rotateImage(side) {
      return () => {
        let position = imageNumber;
        const cardImage = document.getElementById("cardImage");
        const preview = images.map((image) => (
          <img src={image.image} alt={image.image_id} />
        ));
        if (side === "left" && position > 0) {
          setImageNumber(position - 1);
          let x = images[position - 1].image;
          x = `<img src="${x}" alt="${
            images[position - 1].image_id
          }" class="rounded-t-3xl h-[280px] w-[100%]"/>`;
          cardImage.innerHTML = x;
        } else if (side === "right" && position < preview.length - 1) {
          setImageNumber(position + 1);
          let x = images[position + 1].image;
          x = `<img src="${x}" alt="${
            images[position + 1].image_id
          }" class="rounded-t-3xl h-[280px] w-[100%]"/>`;
          cardImage.innerHTML = x;
        }
      };
    }
  
    function deletarImg() {
      const cardImage = document.getElementById("cardImage");
      if (images.length > 1) {
        let position = imageNumber;
        let list = images;
        list.splice(position, 1);
        if (position <= images.length - 1) {
          let x = images[position].image;
          x = `<img src="${x}" alt="${images[position].image_id}" class="rounded-t-3xl h-[280px] w-[100%]"/>`;
          cardImage.innerHTML = x;
        } else {
          let x = images[position - 1].image;
          x = `<img src="${x}" alt="${
            images[position - 1].image_id
          }" class="rounded-t-3xl h-[280px] w-[100%]"/>`;
          cardImage.innerHTML = x;
          setImageNumber(position - 1);
        }
      } else {
        images.splice(0, 1);
        cardImage.innerHTML = `<div class=' flex w-[100%] h-[280px] border-b-2 mb-2 justify-center items-center text-center text-9xl'><i class='fa-solid fa-image'></i></div>`;
      }
      let position = imageNumber;
      let list = images;
      console.log("deletar");
      console.log(position);
      console.log(list);
      console.log(images.length);
      console.log(images[position]);
      console.log(images);
    }

    async function criarLeilao() {

      if (nome === "" || nome === "Nome do Produto" || nome === " " || nome.length< 5 || nome.trim() === ""|| /[?!,@#$%¨&*()-+=/|;:<>.'´`[{}]/.test(nome) || /]/.test(nome) || nome.length > 100) {
        return toast.error("Nome do produto não pode ser vazio, deve conter mais de 5 caracteres, no máximo 100 e não pode conter nenhum caracter especial (?,!,@,#,$,%,¨,&,*,(,),-,+,=,/,|,;,:,<,>,.,',´,`,[,],{,}).", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      var valor_trabalhado = String(valor).replace("R$", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".").replace("-","");
      console.log(valor_trabalhado);
      if (valor === "" || valor === "Valor do Produto" || valor === " " || String(valor).trim() === " " || valor < 0 || /[?!@#%¨&*()-+=/|;:<>'´`]/.test(valor) || valor === "R$ 0,00" || !/[0-9]/.test(valor) || valor_trabalhado > 1000000000 || parseFloat(valor_trabalhado) === 0 || valor_trabalhado < 0) {
        return toast.error("O valor inicial não pode ser nulo, negativo ou maior que R$1.000.000.000,00.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      var date_now = Date.now();
      var date = new Date(date_now);
      date = date.toISOString();
      date = moment(date).format("YYYY-MM-DDTHH:mm")
      var date5 = moment(date).add(5, 'minutes').format("YYYY-MM-DDTHH:mm")
      var date100 = moment(date).add(100, 'years').format("YYYY-MM-DDTHH:mm")
      if (abertura === "" || abertura === "xx/xx/xx xx:xx" || abertura === " " || abertura.trim() === " " || abertura === date || abertura < date5 || abertura > date100) {
        return toast.error("Você não pode criar um leilão pra agora, somente para daqui no mínimo 5 minutos.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      if (duracao === "" || duracao === "xx:xx" || duracao === " " || duracao.trim() === " " || duracao === "00:00" || duracao < "00:05") {
        return toast.error("O leilão deve ter duração mínima de 5 minutos.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
      if (images.length === 0) {
        return toast.error("Você deve adicionar pelo menos uma imagem.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
  
      var end = moment(abertura).add(duracao.split(':')[0], 'hours').format("YYYY-MM-DDTHH:mm");
      end = moment(end).add(duracao.split(':')[1], 'minutes').format("YYYY-MM-DDTHH:mm");
      
      var i = 1;
      for (let image of images) {
        image['image_id'] = i.toString();
        i++;
      }

      const json = {
        title : nome,
        description : desc,
        start_date : Date.parse(abertura)/1000,
        end_date :  Date.parse(end)/1000,
        start_amount : parseFloat(valor_trabalhado),
        // images : Array.from(images).map((image) => ({
        //   image_id: image.image_id,
        //   image_body: image.image_base64,
        // })),
        images : images,
      };
      console.log(json);
  
      await fetch(process.env.REACT_APP_API + '/create-auction', {
              mode: 'cors',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token')
              },
              body: JSON.stringify(json),
          }).then(response => {
              if(response.ok){
                  return response.json()
              }else{
                  return Promise.reject(response);
              }
          }).then(data => {
              // AQUI VC CONTROLA O JSON DE RETORNO
              console.log(data);
              toast.success(data.message, {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              })
              setTimeout(() => {
                deletarEvento(idModal);
                window.location.reload();
              }, 3000);
              // console.log("data: " + data.message)
          }).catch(error => {
              // AQUI VC CONTROLA O RESULTADO (STATUS CODE + MESSAGE)
              console.log("ERROOOO " + error.status);
              // 3. get error messages, if any
              error.json().then((json: any) => {
                  console.log(json);
                  toast.error(json.message, {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                  })
              })
          });
    }

    return (
        <>
        {data.map((data, index) => (
          <div key={index}>
            {/* Card */}
            <div className="border-2 border-black rounded-[25px]">
                <div>
                    <div className="relative">
                        <button className="absolute mt-1 me-1 top-0 right-0 bg-yellow-300 text-xl rounded-full py-1 px-2 hover:w-[40px] hover:h-[40px]" onClick={() => {createModalD(data.auction_id, data.title)}}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
                    <img src={data.images[0].image_body} alt="Imagem do evento" className="w-[100%] h-[250px] rounded-t-[25px] object-cover"/>
                </div>
                <div className="text-center">
                    <p className="text-2xl pb-0">{data.title}</p>
                    <p className="text-2xl"><strong>Lance: R${data.start_amount}</strong></p>
                    <button className="bg-yellow-300 py-2 px-10 text-xl rounded-full cursor-pointer mt-1 hover:text-2xl" onClick={() => {openModalE(data)}}>Editar</button>
                    <div className="flex justify-between gap-2">
                        <div>
                            <p className="text-xl text-left ms-2 py-0 my-0">Data de Início:</p>
                            <p className="text-md text-left ms-2 py-0 my-0">{convertData(data.start_date)}</p>
                        </div>
                        <div>
                            <p className="text-xl text-right me-2 py-0 my-0">Duração:</p>
                            <p className="text-md text-right me-2 py-0 my-0">{convertDuration(data.start_date, data.end_date)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Delete*/}
            <div
              className={`fixed flex-col inset-0 m-auto bg-black bg-opacity-80 w-[100%] h-screen text-center ${
                closeModalD ? "flex" : "hidden"
              }`}
              onKeyDown={fecharTecla}
              ref={focusScreen}
              tabIndex={0}
            >
              <div className="absolute flex-col inset-0 m-auto bg-white w-[30%] h-[300px] text-center">
                
                <div className="relative m-0">
                  <div className="bg-azul">
                    <button
                      className="absolute top-0 right-0 me-2 text-4xl w-[40px] text-vermelho hover:bg-vermelho hover:text-white"
                      onClick={() => {
                        setCloseModalD(false);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <h6 className="text-4xl text-center py-2 text-white">Deseja excluir o evento <br/>{nome}?</h6>
                  </div>
                  <div className="mt-2 px-5">
                    <p id="modalD_message" className="text-xl">Após você deletar o leilao, não será mais possível de recupera-lo, realmente deseja deletar o leilão {nome}?</p>
                  </div>
                  <div className="flex py-2 my-auto justify-center mt-4">
                        <button className="bg-azul p-2 border-2 rounded-[10px] w-[55%] h-[70px] my-5 text-white text-xl mx-[2px]" onClick={() => {deletarEvento(idModal)}}>Sim, desejo deletar o leilão</button>
                        <button className="bg-gray-500 p-2 border-2 rounded-[10px] w-[30%] h-[70px] my-5 text-white text-xl mx-[2px]" onClick={() => {setCloseModalD(false);}}>Não</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Edit */}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel="Example Modal" 
              style={
                {
                    overlay:{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                    content:{
                        backgroundColor: '#fff',
                        width: '80%',
                        height: window.innerWidth >= 768 ? '85%' : '75%',
                        height: '700px',
                        margin: 'auto',
                        padding: 0,
                    }
                }
            }
            >
              <div>                
                <div className="bg-azul">
                  <button className="absolute top-0 right-0 me-2 text-4xl text-vermelho w-[40px] hover:bg-vermelho hover:text-white" onClick={() => {setIsOpen(false)}}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <h6 className="text-4xl text-center py-2 mb-10 text-white">
                    Edição de Leilão
                  </h6>
                </div>
                  
                  <div className="flex">
                    {/* Lado Esquerdo*/}
                    <div id="ladoEsq" className="hidden md:flex md:flex-col md:w-[50%] w-[100%] md:border-r-2 md:border-black">
                      <div className="flex">
                        {/* Rotação Esq */}
                        <button className="text-3xl ps-3 md:ps-20" onClick={rotateImage("left")}><i className="fa-solid fa-chevron-left"></i></button>
                        {/* Card */}
                        <div className="border-2 border-black rounded-[25px] w-[80%] md:w-[60%] mx-auto">
                          {/* Parte de cima do card */}
                          <div className="relative">
                            {/* Imagem card */}
                            <div id="cardImage">
                              <div className=" flex w-[100%] h-[200px] md:h-[280px]  border-b-2 mb-2 justify-center items-center text-center text-9xl">
                                <img src={images.length > 0 ? images[0].image_body : 'https://placehold.co/500x500'} alt="Imagem do evento" className="w-[100%] h-[280px] rounded-t-[25px] object-cover"/>
                              </div>
                            </div>
                            {/* botão deletar img card */}
                            <div id="deletarImgButton">
                              {images.length > 0 ? (<button className="absolute top-0 right-0 me-2 text-4xl text-vermelho" onClick={() => {deletarImg();}}><i className="fa-solid fa-xmark"></i></button>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          {/* Infos card */}
                          <div className="text-center">
                            <p className="text-2xl pb-2">{nome}</p>
                            <p className="text-2xl pb-2">
                              <strong>Lance Inicial: {valor}</strong>
                            </p>
                            <div className="flex justify-between px-2 mb-2">
                              <div className="text-left">
                                <p className="text-lg">Data de início:</p>
                                <p>{moment(abertura).format("DD/MM/YYYY HH:mm")}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg">Duração:</p>
                                <p>{duracao}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Rotação Dir */}
                        <button className="text-3xl md:pe-20" onClick={rotateImage("right")}>
                          <i className="fa-solid fa-chevron-right"></i>
                        </button>
                      </div>
                              
                      {/* upload */}
                      <div className="mt-6 mx-auto">
                        {/* <label htmlFor="upload-photo" className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] my-3 text-xl cursor-pointer hover:text-2xl">
                          Adicionar imagem
                        </label>
                        <input type="file" name="photo" accept="image/png, image/gif, image/jpeg" multiple id="upload-photo" onChange={addImage} className="hidden"/> */}
                        <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[100%] my-0 text-xl hover:text-2xl" onClick={addImage}>Adicionar Imagem</button>
                      </div>
                    </div>
                    {/* Lado Direito */}
                    {/* Form(inputs) */}
                    <div id="ladoDir" className="w-[100%] md:w-[50%] md:border-l-2 md:border-black text-left flex flex-col">
                      <div className="flex flex-col w-[90%] mx-auto">
                        <label className="text-2xl">Nome do evento</label>
                        <input
                          id="nome_prod"
                          className=" mb-2 border-2 border-black rounded text-lg ps-1"
                          type="text"
                          placeholder="Nome do evento: Kit de Panelas"
                          value={nome}
                          onChange={(e) => {
                            setNome(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col w-[90%] mx-auto">
                        <label className="text-2xl">Valor</label>
                        <CurrencyInput
                          id="valor_prod"
                          className=" mb-2 border-2 border-black rounded text-lg ps-1"
                          placeholder="Valor: 00,00"
                          maxLength={13}
                          decimalsLimit={2}
                          prefix={`R$`}
                          defaultValue={valor}
                          onChange={(e) => {
                            setValor(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col w-[90%] mx-auto">
                        <label className="text-2xl">Descrição</label>
                        <textarea
                          id="desc_prod"
                          className=" mb-2 border-2 h-[150px] md:h-[200px] border-black rounded text-lg resize-none ps-1"
                          placeholder="Descrição"
                          value={desc}
                          onChange={(e) => {
                            setDesc(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-col md:flex-row justify-between w-[90%] mx-auto text-left">
                        <div className="flex flex-col">
                          <label className="text-2xl">Data de início</label>
                          <input
                            id="abertura_prod"
                            className=" mb-2 border-2 border-black rounded text-lg"
                            type="datetime-local"
                            placeholder="Data de início"
                            value={abertura}
                            onChange={(e) => {
                              setAbertura(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex flex-col text-left md:text-right pb-5">
                          <label className="text-2xl">Duração</label>
                          <div className="text-left md:text-center">
                            <input
                              id="duracao_prod"
                              className="ps-1 text-lg border-2 border-black rounded"
                              type="time"
                              placeholder="Duração"
                              value={duracao}
                              onChange={(e) => {
                                setDuracao(e.target.value);
                              }}
                            />
                            <p>Hora:Min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Botão de criar leilão */}
                  <div className="md:text-center">
                    {window.innerWidth >= 768 ?
                      <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] md:mt-8 text-xl hover:text-2xl" onClick={criarLeilao}>
                        Atualizar leilão
                      </button>
                      :<button id="botao_cel_prox" className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[60%] md:mt-8 mt-6 text-xl hover:text-2xl" onClick={prox}>
                        Ver como ficou
                       </button>}
                       <div id="proxBot" className="hidden flex-row mt-10 w-[100%] text-center justify-center">
                          <button className="bg-yellow-300 w-[15%] border-2 border-black rounded-full me-2" onClick={back}><i className="fa-solid fa-arrow-left"></i></button>
                          <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[60%] md:mt-8 text-xl hover:text-2xl" onClick={criarLeilao}>
                            Atualizar leilão
                          </button>
                       </div>
                  </div>
              </div>
            </Modal>

          </div>
        ))}
        </>
    )
}