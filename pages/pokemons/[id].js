import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';



const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width:'auto',
        alignItems: 'center',
        padding: '1rem'
    },

    objects: {
        border: '.1rem solid #000',
        backgroundColor: '#d8eaff',
        boxShadow: '.3rem .3rem .3rem rgb(0,0,0,0.8)',
        marginBottom: '1rem'
    },

    title: {
        textAlign: 'center',
        borderBottom: '.1rem solid #000',
        width: 'auto',
        margin: '0'
    },

    ubication: {
        backgroundColor: '#fff3d8',
        textAlign: 'center',
        fontSize: '1.8rem',
        borderTop: '.1rem solid #000',
        marginBottom: '.0',
    },

    btn: {
        cursor: 'pointer',
        fontSize:'1.7rem',
        fontFamily: 'Simonetta, cursive',
        border: '.1rem solid #000',
        borderRadius: '.3rem',
        backgroundColor: '#fff',
        paddingLeft: '.3rem',
        paddingRight: '.3rem'
    },
      
}

const Pokemon = ({ data, loc }) => {
    const router = useRouter();
    console.log({loc});

    if(router.isFallback) {
        return <p>Cargando...</p>
    }

    const area = loc.location.name.split('-').join(' ');
    return(
        <div className="container" style={styles.container}>
            <div style={styles.objects}>
                <h1 style={styles.title}>{data.name} número # {data.id}</h1>
                <Image src={data.sprites.front_default} width={400} height={400} />
                <p style={styles.ubication}>Ubicación: {area}</p>                       
            </div>
            <Link href="/"><span style={styles.btn} className="enlace">Volver</span></Link>    
        </div>
        
    );
}

export default Pokemon;

export const getStaticProps = async ({ params }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const location = await fetch(`https://pokeapi.co/api/v2/location-area/${params.id}`);
    const data = await response.json();
    const loc = await location.json();

    return { props: { data, loc } }
}

export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } },
        { params: { id: '2' } },
    ]

    return {
        paths,
        fallback: true
    }
}