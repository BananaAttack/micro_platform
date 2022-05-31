import html2Canvas from 'html2canvas'
import Vue from 'vue'
import JsPDF from 'jspdf'
export default{
    install (Vue, options) {
        Vue.prototype.getPdf = function (id,title) {
            html2Canvas(document.querySelector(`#${id}`), {
                // allowTaint: true
                scale: 2,
                useCORS:true//看情况选用上面还是下面的，
            }).then(function (canvas) {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
              
                var pageData = canvas.toDataURL('image/jpeg', 0.4);
              
                var pdfWidth = (contentWidth + 10) / 2 * 0.75;
                var pdfHeight = (contentHeight + 200) / 2 * 0.75; // 500为底部留白
              
                var imgWidth = pdfWidth;
                var imgHeight = (contentHeight / 2 * 0.75); //内容图片这里不需要留白的距离
              
                var pdf = new JsPDF('', 'pt', [pdfWidth, pdfHeight]);
                pdf.addImage(pageData, 'jpeg', 0, 0, imgWidth, imgHeight);
                pdf.save('report_pdf_' + new Date().getTime() + '.pdf');
           
                }
            )
        }
    }
}