import styled from 'styled-components/native';

export const Background = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding-top: 100px;
`;

export const Container = styled.KeyboardAvoidingView`
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    margin-bottom: 5px;
`;

export const LogoText = styled.Text`
    margin-bottom: 15px;
    font-size: 25px;
    font-weight: bold;
    color: rgba(0,255,15,0.80);
`;

export const AreaInput = styled.View`
    flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'rgba(0,0,0,0.6)'
})`
    background: rgba(0,0,0,0.20);
    width: 90%;
    font-size: 17px;
    color: #000;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 7px;
`;

export const SubmitButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    background-color: #00b94a;
    width: 90%;
    height: 45px;
    border-radius: 7px;
`;

export const SubmitText = styled.Text`
    font-size: 17px;
    color: #131313;
`;

export const Link = styled.TouchableOpacity`
    margin-top: 7px;
`;

export const LinkText = styled.Text`
    font-size: 17px;
    color: #0000ff;
    font-weight: bold;
`;