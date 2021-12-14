import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 5px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    padding: 5px;
    align-items: center;
    height: 50px;
    border-radius: 8px;
    background-color: #00ff4a;
    width: 80%;
    margin-left: 15px;
`;

export const Nome = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: rgb(0,0,0);
`;

export const DeleteButton = styled.TouchableOpacity`

`;