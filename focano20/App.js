import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, CommonActions } from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import VerDisciplinas from './screens/VerDisciplinas';
import AdicionarDisciplinas from './screens/AdicionarDisciplina';
import EncontrarRecurso from './screens/EncontrarRecurso';
import VerRecurso from './screens/VerRecurso';
import UserNotAutenticated from './screens/UserNotAutenticated';
import AdicionarRecurso from './screens/AdicionarRecurso';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="VerDisciplinas" component={VerDisciplinas} options={{ headerShown: false }}/>
        <Stack.Screen name="AdicionarDisciplina" component={AdicionarDisciplinas} options={{ headerShown: false }}/>
        <Stack.Screen name="EncontrarRecurso" component={EncontrarRecurso} options={{ headerShown: false }}/>
        <Stack.Screen name="VerRecurso" component={VerRecurso} options={{ headerShown: false }}/>
        <Stack.Screen name="UserNotAuthenticated" component={UserNotAutenticated} options={{ headerShown: false }}/>
        <Stack.Screen name="AdicionarRecurso" component={AdicionarRecurso} options={{ headerShown: false }}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;