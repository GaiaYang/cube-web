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
  /** 角塊定向（Orient Corners of the Last Layer）*/
  OCLL = "OCLL",
  /** 全角朝上 */
  ALL_CORNERS_ORIENTED = "ALL_CORNERS_ORIENTED",
  /** 不規則型 */
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

export enum F2LCategory {
  /** 已連接的對組（Connected Pairs） */
  CONNECTED_PAIRS = "CONNECTED_PAIRS",
  /** 角塊已在正確位置（Corner in Slot） */
  CORNER_IN_SLOT = "CORNER_IN_SLOT",
  /** 尚未連接的對組（Disconnected Pairs） */
  DISCONNECTED_PAIRS = "DISCONNECTED_PAIRS",
  /** 邊塊已在正確位置（Edge in Slot） */
  EDGE_IN_SLOT = "EDGE_IN_SLOT",
  /** 可自由移動的對組（Free Pairs） */
  FREE_PAIRS = "FREE_PAIRS",
  /** 對組在插槽中（Pieces in Slot） */
  PIECES_IN_SLOT = "PIECES_IN_SLOT",
}
