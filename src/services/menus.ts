const link1 = "https://api.npoint.io/dda9cf7637ac31cad7b4";
const link = "https://api.npoint.io/6f5122abae3b1a7088c0";
//https://api.npoint.io/6f5122abae3b1a7088c0
const test = "https://dummyjson.com/products";
const link3 = "https://6972d2a732c6bacb12c7c45a.mockapi.io/menu";
export const getMenus = async () => {

    try{
        const response = await fetch(link3);
        if(!response.ok) throw new Error("error fetch menu");
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
    
};
