import axios from "axios";

const getCityByLocation = async (latitude, longitude) => {
    while (true) {
        const res = await axios.get(`https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=b5181ec77a771113116bff071b02d136`);
        console.log(res.data.regeocode)
        if (res.data.regeocode) {
            const address = res.data.regeocode.formatted_address;
            return address;
        }
    }

};

export default getCityByLocation;