import { useTheme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";
import {CheckCircle, Headlights, Package, Truck, CurrencyDollar, Money, Question} from 'phosphor-react-native'


const {colors} = useTheme()
   const ENUM_STATES : any = {
    "Objeto entregue ao destinatário": <CheckCircle weight='fill' size={42} color={colors.green[500]} />,
    "Objeto postado": <Headlights weight='fill' size={42} color={colors.orange[800]}/>,
    "Objeto saiu para entrega ao destinatário": <Package weight='fill' size={42} color={colors.blue[900]}/>,
    "Objeto em trânsito - por favor aguarde": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Pagamento confirmado": <Money weight='fill' size={42} color={colors.green[300]}/>,
    "Aguardando pagamento": <CurrencyDollar weight='fill' size={42} color={colors.red[500]}/>,
    "Encaminhado para fiscalização aduaneira": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Objeto recebido pelos Correios do Brasil": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
    "Fiscalização aduaneira finalizada": <Truck weight='fill' size={42} color={colors.yellow[600]}/>,
   
  };