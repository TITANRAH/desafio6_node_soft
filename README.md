# desafio6_node_soft

Tuve que cambiar el puerto en el front, de 3000 a 4000
Tuve que mejorar una funcionalidad en el front, que aun tengo la duda si es un error de front o no, pero la funcionalidad esta en:

src/views/Perfil

linea 5 en adelante
la variable cambiada fue const urlServer = "http://localhost:4000"
y tuve que acceder al primer elemento del arreglo que llega desde el backend 
por lo que tuve que cambiar el seteo de usuario 

await setUsuarioLocal(data[0]);

esta es la funcion donde se hicieron los cambios, la ruta para acceder es src/views/Perfil linea 5 en adelante

const [usuario, setUsuarioLocal] = useState({});

  const getUsuarioData = async () => {
    const urlServer = "http://localhost:4000";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");
    console.log('token desde front',token)

    try {
      const {data} = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      
      console.log('data desde front', data)
      await setUsuarioGlobal(data);
      await setUsuarioLocal(data[0]);

      console.log('data:',usuario)
    } catch ({ response: { data: message } }) {
      alert(message + " 🙁");
      console.log(message);
    }
  };
