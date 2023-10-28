import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 4px;
    margin: 4px 0;
    flex-wrap: wrap;
`

export const Reaction = styled.div<{own: boolean}>`
    font-size: 14px;
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
    padding: 2px 5px;
    color: ${({own}: {own: boolean}) => own ? '#276488' : '#8C98A1'};
    border: 1px solid ${({own}: {own: boolean}) => own ? '#276488' : 'transparent'};
    border-radius: 12px;
    transition: background 150ms;
    cursor: pointer;

    span:last-child {
        font-size: 12px;
        font-weight: 600;
    }
    
    background: rgba(223, 223, 227, 0.08);
    &:hover {
        border: 1px solid ${({own}: {own: boolean}) => own ? '#276488' : '#383A3D'};
        background: #212325;
    }
`