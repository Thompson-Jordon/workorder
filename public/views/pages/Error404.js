let Error404 = {
   render: async () => {
     let view =
       /*html*/
       `<section class="section">
       <h1>404 Error</h1>
       <p>Page does not exist...</p>
    </section>`;
     return view;
   },
   after_render: async () => {}
 };
 export default Error404;