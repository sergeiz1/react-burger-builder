import React from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    //return class extends Component { 
    return props => {
        const [error, errorDismissHandler] = useHttpErrorHandler(axios);

        /*  state = {
             error: null
         } */
        /* const [error, setError] = useState(null);

        // will be called, after all children were rendered -> constructor()
        // componentDidMount() {
        // constructor() {
        //super();
        // this.
        const requestInterceptor = axios.interceptors.request.use(request => {
            //this.setState({ error: null });
            setError(null);
            return request;
        });
        // response => response === return response
        // this
        const responseInterceptor = axios.interceptors.response.use(response => response, error => {
            // this.setState({ error: error });
            setError(error);
        }); */
        // }

        // useEffect() in functional components
        // remove interceptors to prevent memory leaks
        /* componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        } */
        /*         useEffect(() => {
                    return () => {
                        axios.interceptors.request.eject(requestInterceptor);
                        axios.interceptors.response.eject(responseInterceptor);
                    }
                }, [requestInterceptor, responseInterceptor]);
        
                const errorDismissHandler = () => {
                    // this.setState({ error: null }) 
                    setError(null);
                } */

        // render() {
        return (
            <Aux>
                {/* <Modal show={this.state.error} modalClosed={this.errorDismissHandler}> */}
                <Modal show={error} modalClosed={errorDismissHandler}>
                    {error && error.message}
                </Modal>
                { /* ...props -> any props the component receives */}
                <WrappedComponent {...props} />
            </Aux>
        );
        // }
    }
}

export default withErrorHandler;