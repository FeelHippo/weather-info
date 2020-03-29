import Data from './data.json'

const api = () => {
    return {
        get_temperature: async (time) => {
            try {
                const temperature_unit = Data.temperature.unit;
                // this is where I would normally use a axios.get()
                const time_stamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
                const time_index = Data.temperature.values.findIndex(el => el.time === time_stamp);
                const temperature_chunk = Data.temperature.values.slice(time_index - 720, time_index);                
                
                return { temperature_chunk, temperature_unit }
            } catch (error) {
                console.log(error);
            }
        },
        get_power: async (time) => {
            try {
                const power_unit = Data.power.unit;
                // this is where I would normally use a axios.get()
                const time_stamp = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
                const time_index = Data.power.values.findIndex(el => el.time === time_stamp);
                const power_chunk = Data.power.values.slice(time_index - 720, time_index);                
                
                return { power_chunk, power_unit }
            } catch (error) {
                console.log(error);
            }
        }

    }
}

export default api;