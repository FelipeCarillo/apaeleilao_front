import NavbarAdmin from "../../components/NavbarAdmin";
import Footer from "../../components/Footer";
import CardCriados from "../../components/CardCriado";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import CurrencyInput from "react-currency-input-field";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardFinalizados from "../../components/CardFinalizado";

export default function Leiloes() {
  const [leiloes, setLeiloes] = useState([]);
  const [finalizados, setFinalizados] = useState(false);
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "/get-all-auctions-admin?auctions_closed="+finalizados, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },}).then((response) => {
        if(response.ok){
          return response.json();
        }else{
          return Promise.reject(response);
        }
      }).then((data) => {
        setLeiloes(data.body.auctions);
      }).catch(error => {
      });
    }, [finalizados]);

  const [images, setImages] = useState([]);
  const [nome, setNome] = useState("Nome do Produto");
  const [valor, setValor] = useState("Valor do Produto");
  const [desc, setDesc] = useState("");
  const [abertura, setAbertura] = useState("xx/xx/xx xx:xx");
  const [duracao, setDuracao] = useState("xx:xx");
  const [closeModal, setCloseModal] = useState(false);
  const focusScreen = useRef(null);
  const [imageNumber, setImageNumber] = useState(0);

  function Dropdown() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }

  function LeiloesC() {
    var a = document.getElementById("LeiloesCriados");
    var b = document.getElementById("LeiloesCriadosCards");
    var c = document.getElementById("LeiloesFinalizados");
    var d = document.getElementById("LeiloesFinalizadosCards");
    var e = document.getElementById("botaoCriar");
    a.style.display = "flex";
    b.style.display = "grid";
    c.style.display = "none";
    d.style.display = "none";
    e.style.display = "flex";
  }

  function LeiloesF() {
    var a = document.getElementById("LeiloesCriados");
    var b = document.getElementById("LeiloesCriadosCards");
    var c = document.getElementById("LeiloesFinalizados");
    var d = document.getElementById("LeiloesFinalizadosCards");
    var e = document.getElementById("botaoCriar");
    a.style.display = "none";
    b.style.display = "none";
    c.style.display = "flex";
    d.style.display = "grid";
    e.style.display = "none";
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
  const files = document.getElementById("upload-photo").files;

  const newImagesPromises = Array.from(files).map((file) => {
    return new Promise((resolve) => {
      toDataURL(URL.createObjectURL(file), function (dataUrl) {
        resolve({
          image_id: images.length + 1,
          image: URL.createObjectURL(file),
          image_base64: dataUrl,
        });
      });
    });
  });

  Promise.all(newImagesPromises).then((newImages) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
    Array.from(files).forEach((file) => URL.revokeObjectURL(file));

    // Mostrar a última imagem adicionada
    const lastImage = newImages[newImages.length - 1];
    const cardImage = document.getElementById("cardImage");
    cardImage.innerHTML = `<img src="${lastImage.image}" class="rounded-t-3xl h-[280px] w-[100%]"/>`;

    // Atualizar a posição para a última imagem
    setImageNumber(images.length);
  });
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
  }

  function fecharTecla(tecla) {
    if (tecla.key === "Escape") {
      setCloseModal(false);
    }
  }

  useEffect(() => {
    focusScreen.current.focus();
  }, [closeModal]);

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

  function mudaCriados() {
    LeiloesC();
    setFinalizados(false);
  }
  function mudaFinalizados() {
    LeiloesF();
    setFinalizados(true);
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
    var valor_trabalhado = valor.replace("R$", "").replace(".", "").replace(".", "").replace(".", "").replace(".", "").replace(",", ".").replace("-","");
    if (valor === "" || valor === "Valor do Produto" || valor === " " || valor.trim() === " " || valor < 0 || /[?!@#%¨&*()-+=/|;:<>'´`]/.test(valor) || valor === "R$ 0,00" || !/[0-9]/.test(valor) || valor_trabalhado > 1000000000 || parseFloat(valor_trabalhado) === 0 || valor_trabalhado < 0) {
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
      images : Array.from(images).map((image) => ({
        image_id: image.image_id,
        image_body: image.image_base64,
      })),
    };

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
              window.location.reload();
            }, 3000);
        }).catch(error => {
            // 3. get error messages, if any
            error.json().then((json: any) => {
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
      <NavbarAdmin />
      {/* Navegação lielões */}
      <main className="relative z-0">
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <ul className="grid grid-cols-2 border-b-2 mt-8 pb-2 mx-16">
          <li className="col-span-1 text-center rounded-tl-lg hover:bg-azul hover:text-white" onClick={mudaCriados}>
            <button className="text-2xl md:text-4xl text-center">
              Leilões Criados
            </button>
          </li>
          <li className="col-span-1 text-center rounded-tr-lg hover:bg-azul hover:text-white" onClick={mudaFinalizados}>
            <button className="text-2xl md:text-4xl text-center">
              Leilões Finalizados
            </button>
          </li>
        </ul>

        {/* Parte de leilões criados */}
        <section
          id="LeiloesCriados"
          className="px-0 md:px-4 py-8 mb-12 mx-[60px] flex flex-col gap-x-8 items-center pb-2 border-b border-black"
        >
          <div className="grid grid-cols-10 gap-3 w-[95%]">
            <div className="col-span-10 flex">
              <input
                className="w-[100%] h-14 shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Pesquisar..."
              />
              <button className="ms-2 flex md:hidden text-5xl rounded-full bg-yellow-300 w-[80px] justify-center align-middle" onClick={() => {setCloseModal(true);}}>+</button>
            </div>
          </div>
        </section>
        <section
          id="LeiloesCriadosCards"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10"
        >
          <CardCriados data={leiloes} />
        </section>

        {/* Parte de leilões finalizados */}
        <section id="LeiloesFinalizados" className="hidden px-4 py-8 mb-12 mx-[60px] flex-col gap-x-8 items-center pb-2 border-b border-black" >
          <div className="grid grid-cols-10 gap-3 w-[95%]">
            <div className="col-span-10 md:col-span-8">
              <input
                className="w-[100%] h-14 shadow appearance-none border-2 border-black rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username" type="text" placeholder="Pesquisar..."
              />
            </div>
            <div className="col-span-10 md:col-span-2">
              <button
                onClick={Dropdown}
                className="w-[100%] relative bg-yellow-300 text-3xl rounded-full py-2 px-5 font-medium max-md:text-3xl text-center"
              >
                Filtro <i className="fa-solid fa-filter"></i>
              </button>
              <div
                id="myDIV"
                className="hidden flex-col mt-1 border border-black absolute bg-white w-[228px] md:w-[16%]"
              >
                <button className="text-xl hover:bg-azul">Participou</button>
                <button className="text-xl hover:bg-azul">Pagar</button>
                <button className="text-xl hover:bg-azul">Pago</button>
                <button className="text-xl hover:bg-azul">Não pago</button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="LeiloesFinalizadosCards"
          className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-[70px] gap-10 mb-10"
        >
          <CardFinalizados data={leiloes}/>
        </section>
        {/* Botão para cria leilão */}
        <div id="botaoCriar">
          <div id="botaoCriar" className="w-[100%] text-center">
            <button
              className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[20%] mb-3 text-xl mx-auto md:block hidden hover:text-2xl"
              onClick={() => {
                setCloseModal(true);
              }}
            >
              Adicionar leilão
            </button>
          </div>
        </div>

        {/* Modal de criação de leilão */}
        <div
          className={`fixed flex-col inset-0 m-auto bg-black bg-opacity-80 w-[100%] h-screen text-center ${
            closeModal ? "flex" : "hidden"
          }`}
          onKeyDown={fecharTecla}
          ref={focusScreen}
          tabIndex={0}
        >
          <div className="absolute flex-col inset-0 m-auto bg-white w-[80%] h-[700px] text-center">
            <div className="relative">
              <div className="bg-azul">
                <button
                  className="absolute top-0 right-0 me-2 text-4xl text-vermelho w-[40px] hover:bg-vermelho hover:text-white"
                  onClick={() => {
                    setCloseModal(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <h6 className="text-4xl text-center py-2 mb-10 text-white">
                  Criação de Leilão
                </h6>
              </div>
              <div className="flex">
                {/* Lado Esquerdo*/}
                <div id="ladoEsq" className="hidden md:flex md:flex-col md:w-[50%] w-[100%] md:border-r-2 md:border-black">
                  <div className="flex">
                    {/* Rotação Esq */}
                    <button
                      className="text-3xl ps-3 md:ps-20"
                      onClick={rotateImage("left")}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    {/* Card */}
                    <div className="border-2 border-black rounded-[25px] w-[80%] md:w-[60%] mx-auto">
                      {/* Parte de cima do card */}
                      <div className="relative">
                        {/* Imagem card */}
                        <div id="cardImage">
                          <div className=" flex w-[100%] h-[200px] md:h-[280px]  border-b-2 mb-2 justify-center items-center text-center text-9xl">
                            <i className="fa-solid fa-image"></i>
                          </div>
                        </div>
                        {/* botão deletar img card */}
                        <div id="deletarImgButton">
                          {images.length > 0 ? (
                            <button
                              className="absolute top-0 right-0 me-2 text-4xl text-vermelho"
                              onClick={() => {
                                deletarImg();
                              }}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
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
                    <button
                      className="text-3xl md:pe-20"
                      onClick={rotateImage("right")}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>

                  {/* upload */}
                  <div className="mt-6">
                    <label
                      htmlFor="upload-photo"
                      className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] my-3 text-xl cursor-pointer hover:text-2xl"
                    >
                      Adicionar imagem
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/png, image/gif, image/jpeg"
                      multiple
                      id="upload-photo"
                      onChange={addImage}
                      className="hidden"
                    />
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
              <div>
                {window.innerWidth >= 768 ?
                  <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[40%] md:mt-8 text-xl hover:text-2xl" onClick={criarLeilao}>
                    Criar leilão
                  </button>
                  :<button id="botao_cel_prox" className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[60%] md:mt-8 mt-6 text-xl hover:text-2xl" onClick={prox}>
                    Ver como ficou
                   </button>}
                   <div id="proxBot" className="hidden flex-row mt-10 w-[100%] text-center justify-center">
                      <button className="bg-yellow-300 w-[15%] border-2 border-black rounded-full me-2" onClick={back}><i className="fa-solid fa-arrow-left"></i></button>
                      <button className="bg-yellow-300 p-2 border-2 border-black rounded-[45px] w-[60%] md:mt-8 text-xl hover:text-2xl" onClick={criarLeilao}>
                        Criar leilão
                      </button>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
