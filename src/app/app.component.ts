import { AfterViewInit, Component } from '@angular/core';
import { Inventor } from './common/inventor';

const $ = document.querySelector.bind(document);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'form';

  inventors: Inventor[] = [];
  ngAfterViewInit(): void {
    this.render(this.show);
  }

  show(htmls: string) {
    let item = document.querySelector('.list');

    if (item) {
      item.innerHTML = htmls;
    }
  }

  count: number = 1;

  render(callback: (data: string) => any) {
    let htmls = this.inventors
      .map((item) => {
        return `
        <tr>
          <td>${item.id}</td>
          <td>${item.fullName}</td>
          <td>${item.email}</td>
          <td>${item.price}</td>
          <td>${item.address}</td>
          <td>${item.note}</td>
        </tr>
      `;
      })
      .join('');

    callback(htmls);
  }
  // handleData(data: Inventor[]) {
  //   // $('input[name="fullName"]').onclick = () => {
  //   // }
  // }

  getData(
    fullName: string,
    email: string,
    price: string,
    address: string,
    note: string
  ) {
    // Xử lý price hiển thị ra view
    let handleNumber = price;
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(handleNumber))
      handleNumber = handleNumber.replace(pattern, '$1,$2');
    // tạo mảng để push vào this.inventors
    let data = {
      id: this.count,
      fullName: fullName,
      email: email,
      price: `${handleNumber} vnđ`,
      address: address,
      note: note,
    };
    // kiểm tra đã nhập đủ trường dữ liệu chưa
    if (fullName && email && price && address) {
      this.inventors.push(data);
      this.count++;
    } else {
      alert('Vui lòng nhập các trường dữ liệu bắt buộc');
    }
    this.render(this.show);
  }
  // error chưa nhập dự liệu
  checkDataFullName = '';
  checkDataEmail = '';
  checkDataPrice = '';
  checkDataAddress = '';
  handleCheckDataFullName(data: string) {
    this.checkDataFullName = data == '' ? 'Vui lòng nhập trường này' : '';
  }
  handleCheckDataEmail(data: string) {
    this.checkDataEmail = data == '' ? 'Vui lòng nhập trường này' : '';
  }
  handleCheckDataPrice(data: string) {
    this.checkDataPrice = data == '' ? 'Vui lòng nhập trường này' : '';
  }
  handleCheckDataAddress(data: string) {
    this.checkDataAddress = data == '' ? 'Vui lòng nhập trường này' : '';
  }
}
