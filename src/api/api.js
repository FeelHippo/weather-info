import Data from './data.yml'

const api = () => {
    return {
        five_sec_update: async () => {
            try {
                return //data
            } catch (error) {
                console.log(error.response.data);
                
            }
        }
    }
}

export default api;