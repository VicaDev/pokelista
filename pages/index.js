import Link from 'next/link';
import Image from 'next/image';

const Pokemon = ({ pokemon }) => {
  const id = (pokemon.url.split('/').filter(x => x).pop());
  console.log({pokemon});
  return(
          <Link href={`/pokemons/${id}`}>
          <li style={styles.element}>
            {pokemon.name}
          </li>
          </Link>       
  );
}

export default function Pokemons({ pokemons }) {
  return (
    
    <div style={styles.container}>
      <Image src={'/img/titulo.png'} width={150} height={150} objectFit="contain"/>
      
        <ol style={styles.list}>
          {pokemons.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name} />)}
        </ol>     
    </div>
  )
}

export const getStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();

  return {
    props: { pokemons: data.results }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  // title: {
  //   textAlign: 'center',
  //   fontSize: '2rem',
  //   fontWeight: 'bold'
  // },

  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    padding: '1rem',
  },

   element: {
     backgroundColor: '#ffcb05',
     alignItems: 'center',
     display: 'flex',
     flexDirection: 'column',
     padding: '1rem',
     margin: '.5rem .5rem',
     border: '.15rem solid #000',
     boxShadow: '.3rem .3rem .2rem rgb(0, 0, 0, 0.7)',
     borderRadius: '.5rem',
     cursor: 'pointer',
     fontSize: '1.2rem',
     textTransform: 'uppercase',
     fontWeight: 'bold',
  }
}