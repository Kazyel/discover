// import fs from 'fs';

// async function buscarVagasRemotas() {
//   const url = new URL('https://api.adzuna.com/v1/api/jobs/br/search/1');

//   url.searchParams.append('app_id', '84d529df');
//   url.searchParams.append('app_key', '62e3cea665aa3f25be374ff81bb9ab2f');
//   url.searchParams.append(
//     'what_or',
//     'júnior junior front-end frontend fullstack full-stack',
//   );
//   url.searchParams.append('what_and', 'remoto remote');
//   url.searchParams.append('what_exclude', 'senior sênior pleno java');
//   url.searchParams.append('results_per_page', '10');

//   console.log(url.toString());

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log(`Total de vagas: ${data.count}`);

//     data.results.forEach((job) => {
//       console.log({
//         titulo: job.title,
//         empresa: job.company.display_name,
//         localizacao: job.location.display_name,
//         salario: job.salary_min
//           ? `${job.salary_min} - ${job.salary_max}`
//           : 'Não informado',
//         link: job.redirect_url,
//         descricao: `${job.description.substring(0, 100)}...`,
//       });
//     });

//     fs.writeFileSync('vagas.json', JSON.stringify(data.results, null, 2));

//     return data.results;
//   } catch (error) {
//     console.error('Erro ao buscar vagas:', error);
//   }
// }

// buscarVagasRemotas();
