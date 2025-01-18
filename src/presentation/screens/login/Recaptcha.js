import React from 'react';
import { View, Button, Alert } from 'react-native';
import ReCaptchaV3 from 'react-native-recaptcha-v3';






const Recaptcha = () => {


    
  const recaptchaRef = React.useRef(null);


  const onVerify = (token) => {
    console.log("Token recibido: ", token);
    // Envía este token a tu backend para validarlo
    Alert.alert("ReCAPTCHA completado", `Token: ${token}`);
  };







  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ReCaptchaV3
        ref={recaptchaRef}
        siteKey="TU_SITE_KEY_DE_RECAPTCHA" // Obtén esto desde Google Admin Console
        action="login" // Define una acción relevante para tu flujo
        onReceiveToken={onVerify} // Función que maneja el token generado
      />
      <Button title="Validar reCAPTCHA" onPress={() => recaptchaRef.current.refreshToken()} />
    </View>
  );
};

export default Recaptcha;