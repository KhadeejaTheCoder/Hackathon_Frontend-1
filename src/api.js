import axios from "axios";

export default class InventoryApi {
    constructor() {
        this.BASE = "http://127.0.0.1:8000/api/";
        this.username = sessionStorage.getItem("user");
        this.accessToken = sessionStorage.getItem("accessToken");
    }

    async createOrder(data) {
        const response = await axios.post(
            this.BASE + "orders/",
            JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`,
                    "X-Username": this.username
                }
            }
        );

        if(response.status === 201 || response.status === 200){
            console.log(response.data);
            return true;
        }else{
            console.log("Error");
            return false;
        }
    }

    async getAllOrders() {
        try {
            const response = await axios.get(
                this.BASE + "orders/user/", {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        "X-Username": this.username
                    }
                }
            );

            if(response.status === 200){
                console.log(response.data.orders);
                return response.data.orders; // Return the orders array
            }
            return null;
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
            return null;
        }
    }
}