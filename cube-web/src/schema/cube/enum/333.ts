export enum OLLCategory {
  /** 點型（中心點無其他已正確朝上的邊塊）*/
  DOT_CASE = "DOT_CASE",
  /** 方塊型（形成正方形圖案）*/
  SQUARE_SHAPES = "SQUARE_SHAPES",
  /** 閃電型（類似閃電的形狀）*/
  LIGHTNING_SHAPES = "LIGHTNING_SHAPES",
  /** 魚型（形狀像魚）*/
  FISH_SHAPES = "FISH_SHAPES",
  /** 騎士移動型（類似西洋棋中馬的移動路徑）*/
  KNIGHT_MOVE_SHAPES = "KNIGHT_MOVE_SHAPES",
  /** OCLL（僅角塊朝向，邊塊已正確）*/
  OCLL = "OCLL",
  /** 全部角塊已正確朝上*/
  ALL_CORNERS_ORIENTED = "ALL_CORNERS_ORIENTED",
  /** 難以辨識或不規則形狀*/
  AWKWARD_SHAPES = "AWKWARD_SHAPES",
  /** P型（形狀像英文字母P）*/
  P_SHAPES = "P_SHAPES",
  /** T型（形狀像英文字母T）*/
  T_SHAPES = "T_SHAPES",
  /** C型（形狀像英文字母C）*/
  C_SHAPES = "C_SHAPES",
  /** W型（形狀像英文字母W）*/
  W_SHAPES = "W_SHAPES",
  /** L型（形狀像英文字母L）*/
  L_SHAPES = "L_SHAPES",
  /** 線型（形成一條線）*/
  LINE_SHAPES = "LINE_SHAPES",
}

export enum PLLCategory {
  /** 相鄰交換（Adj Swap） */
  ADJ_SWAP = "ADJ_SWAP",
  /** 對面交換（Opp Swap） */
  OPP_SWAP = "OPP_SWAP",
  /** 邊塊排列（EPLL） */
  EPLL = "EPLL",
}
