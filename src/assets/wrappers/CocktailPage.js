import styled from 'styled-components';

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    .btn {
      margin-bottom: 1rem;
    }
    .btn-container {
      display: flex;
      gap: 2rem;
      margin: 0 auto;
      width: max-content;
    }
  }

  .img {
    border-radius: var(--borderRadius);
    max-width: 400px;
    margin: 0 auto;
  }

  .drink-info {
    padding-top: 2rem;
    max-width: 400px;
    margin: 0 auto;
  }

  .drink p {
    font-weight: 700;
    line-height: 2;
    margin-bottom: 1rem;
    text-align: justify;
  }

  .drink-data {
    margin-right: 0.5rem;
    background: var(--primary-300);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    color: var(--primary-700);
    letter-spacing: var(--letterSpacing);
  }

  .ing {
    display: inline-block;
    margin-right: 0.5rem;
  }

  @media (min-width: 892px) {
    .drink {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: center;
    }
    .drink-info {
      padding-top: 0rem;
      max-width: none;
    }
  }
`;

export default Wrapper;
