import { Check, ShoppingBag } from 'lucide-react';
import './store.css';

export function StorePreview({ fixed }: { fixed: boolean }) {
  return (
    <div className="cf-shop">
      <header>
        <span>
          ATLAS<span className="cf-shop-dot">®</span>
        </span>
        <ShoppingBag />
      </header>
      <small>YOUR EVERYDAY ESSENTIALS</small>
      <h2>你的购物袋</h2>
      <div className="cf-product">
        <div className="cf-product-art" data-product="keyboard">
          <span>⌘</span>
        </div>
        <div>
          <b>Studio 键盘</b>
          <p>雾灰 · 无线</p>
          <span>¥328.00 × 2</span>
        </div>
      </div>
      <div className="cf-product">
        <div className="cf-product-art" data-product="pad">
          <span />
        </div>
        <div>
          <b>Desk 桌垫</b>
          <p>石墨 · 90 × 40 cm</p>
          <span>¥99.00 × 1</span>
        </div>
      </div>
      <div className="cf-total">
        <span>
          合计 <small>3 件商品</small>
        </span>
        <strong data-correct={fixed || undefined}>¥{fixed ? '755' : '427'}.00</strong>
      </div>
      <div className="cf-checkout">
        继续结账 <span>↗</span>
      </div>
      <div className="cf-total-note" data-correct={fixed || undefined}>
        {fixed ? (
          <>
            <Check />
            数量已计入，合计正确
          </>
        ) : (
          '2 × ¥328 + ¥99，为什么不是 ¥755？'
        )}
      </div>
    </div>
  );
}
